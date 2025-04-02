import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import routes from "./routes";
import { errorHandler } from "./utils";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.use("/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]:Server is running at http://localhost:${port}`);
});
