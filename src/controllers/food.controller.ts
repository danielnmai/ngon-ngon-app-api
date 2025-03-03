import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllFoods = async (req: Request, res: Response) => {
  const foods = await prisma.food.findMany();

  res.status(200).send(foods);
};

export { getAllFoods };
