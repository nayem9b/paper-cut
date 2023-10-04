import express from "express";
import { categoryRoutes } from "../module/category/category.route";
import { userRoutes } from "../module/user/user.route";
import { bookRoutes } from "../module/book/book.route";
import { orderRoutes } from "../module/order/order.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: categoryRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: bookRoutes,
  },
  {
    path: "/",
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
