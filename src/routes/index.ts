import express from "express";
import { getOrder } from "../controllers/order.controller";

const router = express.Router();

router.get("/orders/:orderId", getOrder);

export default router;
