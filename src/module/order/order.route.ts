import express from "express";
import {postOrderController, getAllOrdersController, getSingleOrderbyOrderIdController} from './order.controller';

const router = express.Router();

router.post("/orders/create-order", postOrderController);
router.get("/orders", getAllOrdersController);
router.get("/orders/:orderId", getSingleOrderbyOrderIdController);

export const orderRoutes = router;
