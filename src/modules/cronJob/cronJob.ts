import cron from "node-cron";
import { scrapingPriceAndInsert } from "../dolarPrice/dolarPrice.controller";

cron.schedule(
  "1-40/2 9,13 * * *",
  async () => {
    console.log("Dolar Price 9-1");
    const result: boolean = await scrapingPriceAndInsert("today");
    console.log(result);
  },
  { scheduled: true, timezone: "America/Caracas" }
);

/* cron.schedule(
  "0,5,10,15,20,25,30,35,40,45,50,55 * * * *",
  async () => {
    console.log("Dolar Price every 30 minutes");
    const result: boolean = await scrapingPriceAndInsert("history");
    console.log(result);
  },
  { scheduled: true, timezone: "America/Caracas" }
); */
