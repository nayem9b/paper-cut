import { Book, Category, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IBookFilterRequest, bookSearchableFields } from "./book.constant";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IGenericResponse } from "../../interface/common";

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
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;
  console.log(filtersData);
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  console.log(JSON.stringify(andConditions));
  console.log(JSON.stringify(whereConditions));
  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    take: limit,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const total: number = await prisma.book.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
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
