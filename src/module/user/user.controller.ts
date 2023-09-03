import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  signUpUserToDBService,
  getAllUsersFromDBService,
  getSingleUserFromDBService,
  updateSingleUserFromDBService,
} from "./user.service";

export const signUpUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await signUpUserToDBService(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User CREATED successfully !",
      data: result,
    });
  }
);

export const getAllUsersController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllUsersFromDBService();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully !",
      data: result,
    });
  }
);

export const getSingleUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleUserFromDBService(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single user fetched successfully !",
      data: result,
    });
  }
);

export const updateSingleUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await updateSingleUserFromDBService(id, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user updated successfully !",
      data: result,
    });
  }
);
