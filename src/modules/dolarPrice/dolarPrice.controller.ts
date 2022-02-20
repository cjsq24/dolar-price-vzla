import { Request, Response } from 'express';
import Cont from '../../utils/controller';
import Scraping from '../scrapping/scraping';
import { Platform, IPlatform, DolarPriceToday, DolarPriceHistory } from '../models';
import moment from 'moment-timezone';
import { Types } from 'mongoose';

interface IDolarPrice {
   platform_id: string | Types.ObjectId;
   price: string;
}

interface IDolarTodayFull {
   _id: string;
   platforms: [{
      platform_id: {
         _id: string;
         name: string;
         keyname: string;
         image: string;
      };
      price: string;
      fluctuation_bs: string
      fluctuation_percent: string;
   }];
   created_at: string;
}

interface IController {
   getActualPrice: (req: Request, res: Response) => void;
   create: (req: Request, res: Response) => void;
   testingScraping: (req: Request, res: Response) => Promise<void>;
}

const DolarPriceController: IController = {
   getActualPrice: (req: Request, res: Response): void => {
      Cont.tryCatch(res, async () => {
         const result: any = await DolarPriceToday
            .find()
            .sort({ _id: -1 })
            .limit(2)
            .populate('platforms.platform_id');

         if (result) {
            //Seteamos un arreglo nuevo con su interface
            //Extraemos la última actualización de precio
            //let dolarPriceToday: IDolarTodayFull = result.length === 2 && JSON.parse(JSON.stringify(result[0]));
            let dolarPriceToday: IDolarTodayFull = JSON.parse(JSON.stringify(result[0]));
            if (dolarPriceToday && result[1]) {
               //Almacenamos el precio anterior en un nuevo objeto, para calcular la fluctuación
               let previousPrice = {};
               result[1].platforms.map(({ platform_id: plat, price }) => {
                  if (plat) {
                     previousPrice[plat._id.toString()] = price;
                  }
               });

               //Calculamos la fluctuación
               dolarPriceToday.platforms.map(({ platform_id: plat, price }, i) => {
                  const oldPrice: number = parseFloat(previousPrice[plat._id]) || 0;
                  const newPrice = parseFloat(price);

                  const fluctuation_bs = newPrice - oldPrice;
                  const fluctuation_percent = ((fluctuation_bs * 100) / newPrice).toFixed(2);
                  dolarPriceToday.platforms[i].fluctuation_bs = fluctuation_bs.toFixed(2);
                  dolarPriceToday.platforms[i].fluctuation_percent = fluctuation_percent;
               });
            } else {
               dolarPriceToday.platforms.forEach((element) => {
                  element.fluctuation_bs = '0.00';
                  element.fluctuation_percent = '0.00';
               });
            }
            res.json(Cont.success(dolarPriceToday));
         } else {
            console.log("Error");
            res.status(400).json(Cont.error('dolarPriceGetFailed'));
         }
      });
   },

   create: (req: Request, res: Response): void => {},

   testingScraping: async (req: Request, res: Response): Promise<void> => {
      Cont.tryCatch(res, async () => {
         const result = await scrapingPriceAndInsert('today');
         
         if (result) {
            res.json(Cont.success(result, 'dolarPriceTodayCreateSuccess'));
         } else {
            res.status(400).json('dolarPriceTodayCreateFailed');
         }
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
            const result = await modelToSet.create({ platforms: dolarPrice, created_at: moment.tz(Date.now(), 'America/Caracas') });
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
