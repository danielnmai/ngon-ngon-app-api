import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: +orderId },
  });

  res.status(200).send(order);
};

const getAllOrders = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
    select: { orders: true },
  });

  res.status(200).send(user?.orders);
};

export { getAllOrders, getOrder };
