import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export interface TypedRequest<T> extends Express.Request {
  body: T;
}

interface Handler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

interface ErrorWithStatus extends Error {
  status?: number;
}

const withTryCatch =
  (handler: Handler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      return await handler.call(this, req, res, next);
    } catch (err) {
      return next(err);
    }
  };

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  const errorMessage =
    err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  console.error(err);

  res.status(status).json({
    error: errorMessage,
  });

  return next();
};

const authenticationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
    return;
  }

  jwt.verify(token, "secret", (error, payload) => {
    if (error) {
      res.status(StatusCodes.FORBIDDEN).send(error);
      return;
    }

    console.log("payload ", payload);

    next();
  });
};

export { authenticationHandler, errorHandler, withTryCatch };
