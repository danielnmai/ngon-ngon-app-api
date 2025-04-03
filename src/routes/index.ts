import express from "express";
import { login, refreshToken, verifyJWT } from "../controllers/auth.controller";
import { getAllFoods } from "../controllers/food.controller";
import { getAllOrders, getOrder } from "../controllers/order.controller";
import { getUser } from "../controllers/user.controller";
import { authenticationHandler, withTryCatch } from "../utils";

const router = express.Router();

router.get("/orders/:orderId", withTryCatch(getOrder));
router.get("/orders", withTryCatch(getAllOrders));
router.get("/foods", withTryCatch(getAllFoods));
router.get("/users/:userId", authenticationHandler, withTryCatch(getUser));
router.post("/auth/login", withTryCatch(login));
router.post("/auth/refresh-token", withTryCatch(refreshToken));
router.get("/auth/verify-jwt", withTryCatch(verifyJWT));

export default router;
