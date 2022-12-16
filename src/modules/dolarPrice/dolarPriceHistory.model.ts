import { Schema, model } from "mongoose";
import moment from "moment-timezone";

const venezuelaDate = moment.tz(Date.now(), "America/Caracas");

export interface IDolarPriceHistory {
  platforms: [
    {
      platform_id: string;
      price: string;
    }
  ];
  created_at: any;
}

const modelSchema = new Schema<IDolarPriceHistory>({
  platforms: [
    {
      platform_id: {
        type: Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: { type: Date, default: venezuelaDate },
});

export default model("DolarPriceHistory", modelSchema);
