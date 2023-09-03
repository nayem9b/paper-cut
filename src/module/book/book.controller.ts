import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  addBookToDBService,
  getAllBooksFromDBService,
  getSingleBookFromDBService,
} from "./book.service";
import { getSingleCategoryFromDBService } from "../category/category.service";

export const addBookController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addBookToDBService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "book created successfully",
      data: result,
    });
  }
);
export const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllBooksFromDBService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "books fetched successfully",
      data: result,
    });
  }
);

export const getSingleBookController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleBookFromDBService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book fetched successfully",
      data: result,
    });
  }
);
