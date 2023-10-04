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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const jwtHelpers_1 = require("../helpers/jwtHelpers");
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get authorization token
        const token = req.headers.authorization || req.headers.admin;
        console.log(token);
        if (!token) {
            http_status_1.default.UNAUTHORIZED, "You are not authorized";
        }
        let verifiedUser;
        verifiedUser = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.access_secret);
        if (verifiedUser.role === "admin") {
            next();
        }
        else {
            http_status_1.default.UNAUTHORIZED, "You are not authorized";
            res.send("You are not authorized");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
