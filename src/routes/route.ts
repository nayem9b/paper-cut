import express from "express";
import { categoryRoutes } from "../module/category/category.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: categoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
