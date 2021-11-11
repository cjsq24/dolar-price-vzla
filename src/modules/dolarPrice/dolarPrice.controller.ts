import { Request, Response } from 'express';
import Cont from '../../utils/controller';
import Scraping from '../scrapping/scraping';
import { Platform, IPlatform, DolarPriceToday, DolarPriceHistory } from '../models';

interface IDolarPrice {
   platform_id: string;
   price: string;
}

interface IController {
   getActualPrice: (req: Request, res: Response) => void;
   create: (req: Request, res: Response) => void;
   testingScraping: (req: Request, res: Response) => Promise<void>;
}

const DolarPriceController: IController = {
   getActualPrice: (req: Request, res: Response): void => {
      Cont.tryCatch(res, async () => {
         const result = await (await DolarPriceToday.findOne().sort({ createdAt: -1 }));

         if (result) {
            result.populate('platforms.platform_id');
            res.json(Cont.success(result));
         } else {
            res.status(400).json(Cont.error('dolarPriceGetFailed'));
         }
      });
   },

   create: (req: Request, res: Response): void => {},

   testingScraping: async (req: Request, res: Response): Promise<void> => {
      Cont.tryCatch(res, async () => {
         const resultScraping = await Scraping.getDolarPrice();
         const platforms = await Platform.find();

         if (resultScraping.length > 0 && platforms) {
            //Filtramos el scraping que hicimos dependiendo de las plataformas registradas
            const filteredScraping = resultScraping.filter((ele) => {
               return platforms.some((plat) => plat.keyname === ele.keyname);
            });

            //Creamos nuestro nuevo arreglo donde almacenaremos el resultado del scraping filtrado con su detalle como _id
            const dolarPrice: IDolarPrice[] = [];

            filteredScraping.map(ele => {
               platforms.some((plat) => {
                  if (plat.keyname === ele.keyname) {
                     dolarPrice.push({
                        platform_id: plat._id,
                        price: ele.price
                     });
                  }
               });
            });

            if (dolarPrice.length > 0) {
               const result = await DolarPriceToday.create({
                  platforms: dolarPrice
               });
               
               if (result) {
                  res.json(Cont.success(result, 'dolarPriceTodayCreateSuccess'));
               } else {
                  res.status(400).json('dolarPriceTodayCreateFailed');
               }
               return;
            }
         }
         res.status(400).json('Error');
      });
   }
};

export const scrapingPriceAndInsert = async (type: 'today' | 'history'): Promise<boolean> => {
   try {
      const resultScraping = await Scraping.getDolarPrice();
      const platforms = await Platform.find();

      if (resultScraping.length > 0 && platforms) {
         //Filtramos el scraping que hicimos dependiendo de las plataformas registradas
         const filteredScraping = resultScraping.filter((ele) => {
            return platforms.some((plat) => plat.keyname === ele.keyname);
         });

         //Creamos nuestro nuevo arreglo donde almacenaremos el resultado del scraping filtrado con su detalle como _id
         const dolarPrice: IDolarPrice[] = [];

         filteredScraping.map(ele => {
            platforms.some((plat) => {
               if (plat.keyname === ele.keyname) {
                  dolarPrice.push({
                     platform_id: plat._id,
                     price: ele.price
                  });
               }
            });
         });

         if (dolarPrice.length > 0) {
            const modelToSet = (type === 'today') ? DolarPriceToday : DolarPriceHistory;
            const result = await modelToSet.create({ platforms: dolarPrice });
            return (result) ? true : false;
         }
         return false;
      }
   } catch(e) {
      console.log(e);
      return false;
   }
}

export default DolarPriceController;
