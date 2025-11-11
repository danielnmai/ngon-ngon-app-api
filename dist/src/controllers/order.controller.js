"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postWebhook = exports.updateOrderPaymentStatus = exports.createCheckoutSession = exports.createOrder = exports.getOrder = exports.getAllOrders = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../utils/prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield prisma_1.default.order.findUnique({
        where: { id: +orderId },
    });
    res.status(200).send(order);
});
exports.getOrder = getOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma_1.default.order.findMany();
    res.status(200).send(orders);
});
exports.getAllOrders = getAllOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, paymentType, description, total } = req.body;
    const order = yield prisma_1.default.order.create({
        data: {
            userId,
            paymentType,
            description,
            total,
        },
    });
    res.status(200).send(order);
});
exports.createOrder = createOrder;
const updateOrderPaymentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;
    const order = yield prisma_1.default.order.update({
        where: { id: +orderId },
        data: { paymentStatus },
    });
    res.status(200).send(order);
});
exports.updateOrderPaymentStatus = updateOrderPaymentStatus;
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lineItems, total, paymentType, description, userId } = req.body;
    console.log('line items', lineItems);
    const order = yield prisma_1.default.order.create({
        data: {
            total,
            paymentType,
            description,
            userId,
        },
    });
    const line_items = lineItems.map((item) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
    }));
    const session = yield stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/checkout?success=true&orderId=${order.id}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?success=false&orderId=${order.id}`,
    });
    res.status(http_status_codes_1.StatusCodes.OK).send({ url: session.url });
});
exports.createCheckoutSession = createCheckoutSession;
const postWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const event = req.body;
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            console.log("Checkout session payment was successful. Session: ", session);
            break;
        }
        // case "payment_intent.succeeded":
        // 	const paymentIntent = event.data.object;
        // 	console.log('PaymentIntent was successful! ', paymentIntent);
        // 	break;
        default:
            console.log("Unhandled event type ", event.type);
    }
    res.status(200).send({ received: true });
});
exports.postWebhook = postWebhook;
