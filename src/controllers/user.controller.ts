import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: +userId },
  });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "user not found" });
    return;
  }

  res.status(StatusCodes.OK).send(user);
};

export { getUser };
