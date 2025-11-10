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
exports.verifyJWT = exports.refreshToken = exports.login = void 0;
const google_auth_library_1 = require("google-auth-library");
const jwt_decode_1 = require("jwt-decode");
const prisma_1 = __importDefault(require("../utils/prisma"));
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const { tokens } = yield oAuth2Client.getToken(code);
    const { email, name, picture } = (0, jwt_decode_1.jwtDecode)(tokens.id_token);
    let user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        user = yield prisma_1.default.user.create({
            data: {
                email,
                name,
                picture,
            },
        });
    }
    res.send({ user: { id: user.id, email, name, picture }, tokens });
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CLIENT_ID, CLIENT_SECRET } = process.env;
    const { refreshToken } = req.body;
    const user = new google_auth_library_1.UserRefreshClient(CLIENT_ID, CLIENT_SECRET, refreshToken);
    const { credentials } = yield user.refreshAccessToken();
    res.send(credentials);
});
exports.refreshToken = refreshToken;
const verifyJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const data = yield oAuth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    res.send(data);
});
exports.verifyJWT = verifyJWT;
