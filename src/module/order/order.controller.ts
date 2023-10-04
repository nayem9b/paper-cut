import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  postOrderToDBService,
  getAllOrdersByAdmin,
  getOrdersOfCustomerByOrderIdFromDB,
} from "./order.service";
import jwtDecode from "jwt-decode";
import { UserInfo } from "./order.constant";
import { decodedToken } from "../../helpers/jwtHelpers";

export const postOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const decodedToken = (token: string) => {
      return jwtDecode(token);
    };

    const userinfo = decodedToken(req.headers.authorization as string);
    const orderedBooks = req?.body;
    const result = await postOrderToDBService(
      userinfo as UserInfo,
      orderedBooks
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

export const getAllOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    const userinfo = decodedToken(req.headers.authorization as string);

    const result = await getAllOrdersByAdmin(userinfo as UserInfo);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  }
);

export const getSingleOrderbyOrderIdController = catchAsync(
  async (req: Request, res: Response) => {
    const userinfo = decodedToken(req.headers.authorization as string);
    const orderId = req.params?.orderId; 
    const result = await getOrdersOfCustomerByOrderIdFromDB(
      userinfo as UserInfo,
      orderId as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  }
);
