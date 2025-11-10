import { Request, Response } from "express";
import prisma from "../utils/prisma";

const getAllFoods = async (req: Request, res: Response) => {
	const foods = await prisma.food.findMany({ include: { options: true } });

	res.status(200).send(foods);
};

export { getAllFoods };
