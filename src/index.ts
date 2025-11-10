import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import type { APIGatewayProxyEvent, Context } from "aws-lambda";
import serverlessExpress from "@vendia/serverless-express";

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

// Lambda handler
let serverlessExpressInstance: any;

function createServerlessInstance() {
	if (!serverlessExpressInstance) {
		serverlessExpressInstance = serverlessExpress({ app });
	}
	return serverlessExpressInstance;
}

export const handler = async (
	event: APIGatewayProxyEvent,
	context: Context,
) => {
	// For Lambda deployment
	const serverless = createServerlessInstance();
	return serverless(event, context);
};

// Local development server
// Only start the server if not running in AWS Lambda
if (process.env.NODE_ENV !== "production" || process.env.IS_OFFLINE) {
	app.listen(port || 3000, () => {
		console.log(`[server]:Server is running at http://localhost:${port || 3000}`);
	});
}

export default app;
