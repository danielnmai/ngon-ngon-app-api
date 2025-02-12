import dotenv from "dotenv";
import express, { Request, Response } from "express";

import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.use("/v1", routes);

app.listen(port, () => {
  console.log(`[server]:Server is running at http://localhost:${port}`);
});
