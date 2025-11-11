"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    console.log(process.env);
    res.status(200).send("pong");
});
app.use("/v1", routes_1.default);
app.use(utils_1.errorHandler);
// Lambda handler
let serverlessExpressInstance;
function createServerlessInstance() {
    if (!serverlessExpressInstance) {
        serverlessExpressInstance = (0, serverless_express_1.default)({ app });
    }
    return serverlessExpressInstance;
}
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    // For Lambda deployment
    const serverless = createServerlessInstance();
    return serverless(event, context);
});
exports.handler = handler;
if (process.env.NODE_ENV !== "production") {
    app.listen(port || 3000, () => {
        console.log(`[server]:Server is running at http://localhost:${port || 3000}`);
    });
}
exports.default = app;
