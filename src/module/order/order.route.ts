import express from "express";
import {
  postOrderController,
  getAllOrdersController,
  getSingleOrderbyOrderIdController,
} from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.post("/orders/create-order", postOrderController);
router.get("/orders", getAllOrdersController);
router.get("/orders/:orderId", getSingleOrderbyOrderIdController);

export const orderRoutes = router;
