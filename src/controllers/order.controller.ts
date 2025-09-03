import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
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

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: 'price_1S1F0hKA1oovtT3Z0sIQpKiz',
        quantity: 1,
      },
    ],
  });

  res.status(200).send(paymentLink);
}

export { getAllOrders, getOrder, createOrder };
