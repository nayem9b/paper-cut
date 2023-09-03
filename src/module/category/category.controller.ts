import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  addCategoryToDB,
  getAllCategoryFromDBService,
  updateCategoryFromDBService,
} from "./category.service";

export const addCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addCategoryToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "category created successfully",
      data: result,
    });
  }
);

export const getAllCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllCategoryFromDBService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "category fetched successfully",
      data: result,
    });
  }
);

export const updateCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await updateCategoryFromDBService(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "category updated successfully",
      data: result,
    });
  }
);
