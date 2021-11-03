import { Schema, model } from 'mongoose';

export interface IDolarPriceHistory {
   platforms: [
      {
         platform_id: string;
         name: string;
         keyname: string;
         price: string;
      }
   ]
}

const modelSchema = new Schema<IDolarPriceHistory>({
   platforms: [
      {
         platform_id: {
            type: Schema.Types.ObjectId, ref: 'Platform', required: true,
         },
         name: {
            type: String, required: true,
         },
         keyname: {
            type: String, required: true,
         },
         price: {
            type: String, required: true,
         }
      }
   ]
}, { timestamps: true });

export default model('DolarPriceHistory', modelSchema);
