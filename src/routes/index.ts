import express from "express";
import { getAllFoods } from "../controllers/food.controller";
import { getAllOrders, getOrder } from "../controllers/order.controller";
import { getUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/orders/:orderId", getOrder);
router.get("/orders", getAllOrders);
router.get("/foods", getAllFoods);
router.get("/users/:userId", getUser);

export default router;
