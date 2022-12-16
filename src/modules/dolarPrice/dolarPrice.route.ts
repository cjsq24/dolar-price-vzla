import { Router } from "express";
import controller from "./dolarPrice.controller";

const router = Router();

router.get("/get-actual-price", controller.getActualPrice);
router.post("/create", controller.create);
router.post("/test", controller.testingScraping);
router.get("/get-history-price", controller.getHistoryPrice);

export default router;
