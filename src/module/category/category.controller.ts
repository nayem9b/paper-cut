import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { addCategoryToDB } from "./category.service";

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
