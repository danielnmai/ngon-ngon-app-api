import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

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
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  oAuth2Client.verifyIdToken(
    {
      idToken: token,
      audience: process.env.CLIENT_ID,
    },
    (error) => {
      if (error) {
        console.error("Error verifying token:", error);
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
      } else {
        next();
      }
    }
  );
};

export { authenticationHandler, errorHandler, withTryCatch };
