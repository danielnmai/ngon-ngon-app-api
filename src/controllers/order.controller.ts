import { FoodOptions, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CartItemType, Order } from "../schema/order";
import { StatusCodes } from "http-status-codes";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const prisma = new PrismaClient();

const getOrder = async (req: Request, res: Response) => {
	const { orderId } = req.params;

	const order = await prisma.order.findUnique({
		where: { id: +orderId },
	});

	res.status(200).send(order);
};

const getAllOrders = async (req: Request, res: Response) => {
	const orders = await prisma.order.findMany();

	res.status(200).send(orders);
};

const createOrder = async (req: Request, res: Response) => {
	const { userId, paymentType, description, total } = req.body;

	const order = await prisma.order.create({
		data: {
			userId,
			paymentType,
			description,
			total,
		},
	});

	res.status(200).send(order);
};

const updateOrderPaymentStatus = async (req: Request, res: Response) => {
	const { orderId } = req.params;
	const { paymentStatus } = req.body;

	const order = await prisma.order.update({
		where: { id: +orderId },
		data: { paymentStatus },
	});

	res.status(200).send(order);
};

const createCheckoutSession = async (req: Request, res: Response) => {
	const { lineItems, total, paymentType, description, userId }: Order =
		req.body;

	const order = await prisma.order.create({
		data: {
			total,
			paymentType,
			description,
			userId,
		},
	});

	const line_items = lineItems.map((item: CartItemType) => ({
		price: item.stripePriceId,
		quantity: item.quantity,
	}));

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: "payment",
		success_url: `${process.env.FRONTEND_URL}/checkout?success=true&orderId=${order.id}`,
		cancel_url: `${process.env.FRONTEND_URL}/checkout?success=false&orderId=${order.id}`,
	});

	res.status(StatusCodes.OK).send({ url: session.url });
};

export {
	getAllOrders,
	getOrder,
	createOrder,
	createCheckoutSession,
	updateOrderPaymentStatus,
};
