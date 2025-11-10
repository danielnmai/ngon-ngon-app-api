import { FoodOptions } from "@prisma/client";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { Stripe } from "stripe";
import prisma from "../utils/prisma";
import type { CartItemType, Order } from "../schema/order";

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

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

	console.log('line items', lineItems);

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

const postWebhook = async (req: Request, res: Response) => {
	// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

	const event: Stripe.Event = req.body;

	switch (event.type) {
		case "checkout.session.completed": {
			const session = event.data.object as Stripe.Checkout.Session;
			console.log(
				"Checkout session payment was successful. Session: ",
				session,
			);
			
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
};

export {
	getAllOrders,
	getOrder,
	createOrder,
	createCheckoutSession,
	updateOrderPaymentStatus,
	postWebhook,
};
