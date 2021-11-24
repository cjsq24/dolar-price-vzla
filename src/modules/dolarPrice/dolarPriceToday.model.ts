import { Schema, model } from 'mongoose';

export interface IDolarPriceToday {
   platforms: [
      {
         platform_id: string;
         price: string;
      }
   ],
   created_at: any;
}

const modelSchema = new Schema<IDolarPriceToday>({
   platforms: [
      {
         platform_id: {
            type: Schema.Types.ObjectId, ref: 'Platform', required: true
         },
         price: {
            type: String, required: true
         }
      }
   ],
   created_at: { type: Date }
});

export default model<IDolarPriceToday>('DolarPriceToday', modelSchema);
