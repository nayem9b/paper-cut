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
exports.getSingleOrderbyOrderIdController = exports.getAllOrdersController = exports.postOrderController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
exports.postOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = (token) => {
        return (0, jwt_decode_1.default)(token);
    };
    const userinfo = decodedToken(req.headers.authorization);
    const orderedBooks = req === null || req === void 0 ? void 0 : req.body;
    const result = yield (0, order_service_1.postOrderToDBService)(userinfo, orderedBooks);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order created successfully",
        data: result,
    });
}));
exports.getAllOrdersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userinfo = (0, jwtHelpers_1.decodedToken)(req.headers.authorization);
    const result = yield (0, order_service_1.getAllOrdersByAdmin)(userinfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Orders retrieved successfully",
        data: result,
    });
}));
exports.getSingleOrderbyOrderIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userinfo = (0, jwtHelpers_1.decodedToken)(req.headers.authorization);
    const orderId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.orderId;
    const result = yield (0, order_service_1.getOrdersOfCustomerByOrderIdFromDB)(userinfo, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Orders retrieved successfully",
        data: result,
    });
}));
