import { Book, Category } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IBookFilterRequest } from "./book.constant";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";

export const addBookToDBService = async (data: Book): Promise<Book> => {
  const result = prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

export const getAllBooksFromDBService = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // console.log(page, limit, skip);
  // console.log(filters);
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

export const getAllBooksofCategoryService = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const getSingleBookFromDBService = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const updateBookFromDBService = async (
  id: string,
  payload: Partial<Book>
) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

export const deleteBookFromDBService = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};
