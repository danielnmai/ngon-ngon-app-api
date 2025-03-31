import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.order.findUnique({
      where: { id: +userId },
    });

    if (!user) throw new Error("user not found");

    res.status(200).send(user);
  } catch (error) {
    res.send({
      error:
        error instanceof Error
          ? error.message
          : StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export { getUser };
