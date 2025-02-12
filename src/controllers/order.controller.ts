import { Request, Response } from "express";

const getOrder = async (req: Request, res: Response) => {
  const orderId = req.params;

  console.log("order ID", orderId);

  res.status(200).send("OK");
};

export { getOrder };
