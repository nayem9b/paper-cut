import express from "express";
import { postOrderController } from "./order.controller";

const router = express.Router();

router.post("/orders/create-order", postOrderController);

export const orderRoutes = router;
