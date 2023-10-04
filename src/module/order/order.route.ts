import express from "express";
import {
  postOrderController,
  getAllOrdersController,
} from "./order.controller";

const router = express.Router();

router.post("/orders/create-order", postOrderController);
router.get("/orders", getAllOrdersController);

export const orderRoutes = router;
