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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTryCatch = exports.errorHandler = exports.authenticationHandler = void 0;
const google_auth_library_1 = require("google-auth-library");
const http_status_codes_1 = require("http-status-codes");
const withTryCatch = (handler) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield handler.call(this, req, res, next);
    }
    catch (err) {
        return next(err);
    }
});
exports.withTryCatch = withTryCatch;
const errorHandler = (err, req, res, next) => {
    const status = err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
    res.status(status).json({
        error: errorMessage,
    });
    return next();
};
exports.errorHandler = errorHandler;
const authenticationHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        return;
    }
    const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");
    oAuth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    }, (error) => {
        if (error) {
            console.error("Error verifying token:", error);
            res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            return;
        }
        else {
            next();
        }
    });
};
exports.authenticationHandler = authenticationHandler;
