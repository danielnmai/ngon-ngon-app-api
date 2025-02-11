import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`[server]:Server is running at http://localhost:${port}`);
});
