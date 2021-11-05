import cron from "node-cron";

const date = new Date();

console.log(date.getTime());

cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
});
