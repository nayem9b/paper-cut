import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  addBookToDBService,
  getAllBooksFromDBService,
  getSingleBookFromDBService,
  updateBookFromDBService,
  deleteBookFromDBService,
  getAllBooksofCategoryService,
} from "./book.service";
import { deleteCategoryFromDBService } from "../category/category.service";
import pick from "../../shared/pick";
import { bookFilterableFields, bookSearchableFields } from "./book.constant";
import { paginationFields } from "../../constants/pagination";

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
    const filters = pick(req.query, bookFilterableFields);
    const options = pick(req.query, paginationFields);
    const result = await getAllBooksFromDBService(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "books fetched successfully",
      // meta: result.meta,
      data: result.data,
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
export const getBooksByCategoryIdController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.category;
    console.log(id);
    const result = await getAllBooksofCategoryService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books with associated category data fetched successfully",
      data: result,
    });
  }
);

export const updateBookController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await updateBookFromDBService(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  }
);

export const deleteBookController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteBookFromDBService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "book deleted successfully",
      data: result,
    });
  }
);
