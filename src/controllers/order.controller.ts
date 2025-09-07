import { FoodOptions, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CartItemType } from "../schema/order";
import { StatusCodes } from "http-status-codes";
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

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

  const { productId, quantity } = req.body;

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: 'price_1S1F0hKA1oovtT3Z0sIQpKiz',
        quantity,
      },
    ],
  });

  res.status(200).send(paymentLink);
}

const createCheckoutSession = async (req: Request, res: Response) => {
  const { lineItems } = req.body;

  const line_items = lineItems.map((item: CartItemType) => ({
    price: item.stripePriceId,
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}?cancel=true`,
  });

  res.redirect(303, session.url);
};

export { getAllOrders, getOrder, createOrder, createCheckoutSession };
