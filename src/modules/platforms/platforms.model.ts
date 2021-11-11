import { Schema, model } from 'mongoose';

export interface IPlatform {
   name: string;
   keyname: string;
   image: string;
   status?: '1' | '0';
}

const modelSchema = new Schema<IPlatform>({
   name: { type: String, required: true },
   keyname: { type: String, required: true },
   image: { type: String, required: true },
   status: { type: String, default: '1', enum: ['1', '0'] },
}, { timestamps: true });

export default model('Platform', modelSchema);
