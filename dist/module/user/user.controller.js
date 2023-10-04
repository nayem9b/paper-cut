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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileInfoController = exports.deleteSingleUserController = exports.updateSingleUserController = exports.getSingleUserController = exports.getAllUsersController = exports.loginUser = exports.signUpUserController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
exports.signUpUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, user_service_1.signUpUserToDBService)(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User CREATED successfully !",
        data: result,
    });
}));
exports.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield (0, user_service_1.loginUserToDB)(loginData);
    console.log(result === null || result === void 0 ? void 0 : result.accessToken, result === null || result === void 0 ? void 0 : result.refreshToken);
    const accessToken = result === null || result === void 0 ? void 0 : result.accessToken;
    const refreshToken = result === null || result === void 0 ? void 0 : result.refreshToken;
    // const cookieOptions = {
    //   secure: config.env === "production",
    //   httpOnly: true,
    // };
    // res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        token: accessToken,
    });
}));
exports.getAllUsersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.getAllUsersFromDBService)();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users fetched successfully !",
        data: result,
    });
}));
exports.getSingleUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_service_1.getSingleUserFromDBService)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single user fetched successfully !",
        data: result,
    });
}));
exports.updateSingleUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield (0, user_service_1.updateSingleUserFromDBService)(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "user updated successfully !",
        data: result,
    });
}));
exports.deleteSingleUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_service_1.deleteByIdFromDBService)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "user deleted successfully !",
        data: result,
    });
}));
exports.getProfileInfoController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileinfo = (0, jwtHelpers_1.decodedToken)(req.headers.authorization);
    const { userId } = profileinfo;
    const result = yield (0, user_service_1.getProfileDataFromDB)(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "user deleted successfully !",
        data: result,
    });
}));
