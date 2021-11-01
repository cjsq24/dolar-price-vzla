import { Request, Response } from 'express';
import Controller from '../../utils/controller';
import Scraping from '../scrapping/scraping';

interface IReqGet extends Request {
   query: {
      name: string;
      price: string;
   }
}

interface IClass {
   get(req: IReqGet, res: Response): void;
   create(req: Request, res: Response): void;
   testingScraping(req: Request, res: Response): Promise<void>;
}

class DolarPriceController extends Controller implements IClass {
   get(req: IReqGet, res: Response): void {
      res.json('get method');
   }

   create(req: Request, res: Response): void {}

   async testingScraping(req: Request, res: Response) {
      const result = await Scraping.getDolarPrice();
      res.json(result);
   }
}

export default new DolarPriceController;
