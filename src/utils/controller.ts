import { Response } from 'express';
//Aquí agregaremos lógica para que los demás controladores extiendan esta clase

interface IResponseSuccess {
   success: true;
   data?: [] | {};
   message?: string;
}

interface IResponseError {
   success: false;
   message?: string;
}

interface IClass {
   tryCatch(res: Response, callBack: () => Promise<void>): Promise<void>;
   success(data?: [] | {}, message?: string): IResponseSuccess;
   error(message?: string): IResponseError;
}

class Controller implements IClass {
   async tryCatch(res: Response, callBack: () => Promise<void>): Promise<void> {
      try {
         await callBack();
      } catch (error) {
         console.log(error);
         res.status(400).json(this.error('serverError'));
         return;
      }
   }

   success(data?: [] | {}, message: string = ''): IResponseSuccess {
      return {
         success: true,
         data,
         message
      };
   }

   error(message: string = ''): IResponseError {
      return {
         success: false,
         message
      };
   }
}

export default new Controller;