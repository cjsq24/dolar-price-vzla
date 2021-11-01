import { Request, Response } from 'express';
import Controller from '../../utils/controller';
import { Platform, IPlatform } from '../models';

//En este caso "req" son los valores que recibimos desde el front:
//req.params (el valor que pasamos por url)
//resBody (no lo conozco)
//req.body (valores que recibimos por post, put)
//req.query (valores que recibimos por get)
//En ese mismo orden recibe los parámetros la interface Request
//En este caso a IListReq le estoy enviando una interface a query
interface IListQueryReq {
   name?: string | {};
   keyname?: string | {};
   status?: '1' | '0';
}
interface IListReq extends Request<{}, {}, {}, IListQueryReq> {}
interface ICreateReq extends Request<{}, {}, IPlatform, {}> {}
interface IUpdateReq extends Request<{ _id: string }, {}, IPlatform, {}> {}
interface IChangeStatusReq extends Request<{ _id: string }, {}, {}, {}> {}

interface IClassController {
   list(req: IListReq, res: Response): Promise<void>;
   create(req: ICreateReq, res: Response): Promise<void>;
   update(req: IUpdateReq, res: Response): Promise<void>;
   changeStatus(req: IChangeStatusReq, res: Response): Promise<void>;
}

class PlatformController implements IClassController {
   async list(req: IListReq, res: Response): Promise<void> {
      try {
         const { query } = req;
         const params: IListQueryReq = {};
         if (Object.keys(query).length > 0) {
            if (query?.name) params.name = { $regex: `.*${query.name}.*`, $options: 'i' };
            if (query?.keyname) params.keyname = { $regex: `.*${query.keyname}.*`, $options: 'i' };
         }
         const result = await Platform.find(params);
         res.json({ success: true, data: result, message: '' });
      } catch (error) {
         res.status(400).json({ success: false, data: {}, message: 'serverError' });
      }
   }

   async create(req: ICreateReq, res: Response): Promise<void> {
      try {
         const create = await Platform.create(req.body);
         if (create) {
            res.json({ success: true, data: create, message: 'createSuccess' });
         } else {
            res.status(400).json({ success: false, data: {}, message: 'createFailed' });
         }
      } catch (error) {
         res.status(400).json({ success: false, data: {}, message: 'serverError' });
      }
   }

   async update(req: IUpdateReq, res: Response): Promise<void> {
      try {
         const update = await Platform.findByIdAndUpdate(req.params._id, req.body, { new: true })

         if (update) {
            res.json({ success: true, data: update, message: 'updateSuccess' })
         } else {
            res.status(400).json({ success: false, data: {}, message: 'updateFailed' })
         }
      } catch (error) {
         res.status(400).json({ success: false, data: {}, message: 'serverError' });
      }
   }

   async changeStatus(req: IChangeStatusReq, res: Response): Promise<void> {
      try {
         const getRecord = await Platform.findById(req.params._id);
         getRecord.status = (getRecord.status === '1') ? '0' : '1';
         getRecord.save();

         if (getRecord) {
            res.json({ success: true, data: {}, message: 'changeStatusSuccess' })
         } else {
            res.status(400).json({ success: false, data: {}, message: 'changeStatusFailed' })
         }
      } catch(error) {
         res.status(400).json({ success: false, data: {}, message: 'changeStatusFailed' })
      }
   }
}

export default new PlatformController;