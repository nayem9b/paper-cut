"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_route_1 = require("../module/category/category.route");
const user_route_1 = require("../module/user/user.route");
const book_route_1 = require("../module/book/book.route");
const order_route_1 = require("../module/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/",
        route: user_route_1.userRoutes,
    },
    {
        path: "/",
        route: book_route_1.bookRoutes,
    },
    {
        path: "/",
        route: order_route_1.orderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
