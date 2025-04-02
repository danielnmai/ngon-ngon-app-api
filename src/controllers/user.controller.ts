import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { TypedRequest } from "../utils";
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

type GoogleUser = {
  email: string;
  name: string;
  picture: string;
};

const login = async (req: TypedRequest<GoogleUser>, res: Response) => {
  const { email, name, picture } = req.body;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        picture,
      },
    });
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        picture,
      },
    });
  }

  const payload = {
    id: user.id,
  };

  const accessToken = jwt.sign(payload, "secret", { expiresIn: "1h" });

  res.status(StatusCodes.OK).send({ userId: user.id, accessToken });
};

export { getUser, login };
