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
exports.getOrdersOfCustomerByOrderIdFromDB = exports.getAllOrdersByAdmin = exports.postOrderToDBService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const postOrderToDBService = (userInfo, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    if (userInfo.role === "customer") {
        const result = prisma_1.default.order.create({
            data: {
                userId: userInfo.userId,
                orderedBooks: orderedBooks,
            },
        });
        return result;
    }
    else {
        return {
            data: "You are not authorized",
        };
    }
});
exports.postOrderToDBService = postOrderToDBService;
const getAllOrdersByAdmin = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userInfo);
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === "admin") {
        const result = yield prisma_1.default.order.findMany({});
        return {
            data: result,
        };
    }
    else if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === "customer") {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId,
            },
        });
        return {
            data: result,
        };
    }
    else {
        return {
            data: "You are not authorized",
        };
    }
});
exports.getAllOrdersByAdmin = getAllOrdersByAdmin;
const getOrdersOfCustomerByOrderIdFromDB = (userInfo, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id: orderId,
        },
    });
    if ((result === null || result === void 0 ? void 0 : result.userId) === userInfo.userId) {
        return result;
    }
    else if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === "admin") {
        const result = yield prisma_1.default.order.findMany({});
        return result;
    }
    console.log(result);
});
exports.getOrdersOfCustomerByOrderIdFromDB = getOrdersOfCustomerByOrderIdFromDB;
