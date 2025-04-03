import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import { jwtDecode } from "jwt-decode";
import { TypedRequest } from "../utils";

const prisma = new PrismaClient();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

type GoogleJwtType = {
  name: string;
  email: string;
  picture: string;
};

const login = async (req: TypedRequest<{ code: string }>, res: Response) => {
  const { code } = req.body;

  const { tokens } = await oAuth2Client.getToken(code);

  const { email, name, picture }: GoogleJwtType = jwtDecode(tokens.id_token!);

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
  }

  res.send({ user: { id: user.id, email, name, picture }, tokens });
};

const refreshToken = async (
  req: TypedRequest<{ refreshToken: string }>,
  res: Response
) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const { refreshToken } = req.body;

  const user = new UserRefreshClient(CLIENT_ID, CLIENT_SECRET, refreshToken);

  const { credentials } = await user.refreshAccessToken();

  res.send(credentials);
};

const verifyJWT = async (
  req: TypedRequest<{ token: string }>,
  res: Response
) => {
  const { token } = req.body;

  const data = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  res.send(data);
};

export { login, refreshToken, verifyJWT };
