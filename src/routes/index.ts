import express from "express";
import { getAllFoods } from "../controllers/food.controller";
import { getAllOrders, getOrder } from "../controllers/order.controller";
import { getUser, login } from "../controllers/user.controller";
import { authenticationHandler, withTryCatch } from "../utils";

const router = express.Router();

router.get("/orders/:orderId", withTryCatch(getOrder));
router.get("/orders", withTryCatch(getAllOrders));
router.get("/foods", withTryCatch(getAllFoods));
router.get("/users/:userId", authenticationHandler, withTryCatch(getUser));
router.post("/auth/login", withTryCatch(login));

export default router;
