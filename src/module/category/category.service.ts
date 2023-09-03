import { Category, User } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addCategoryToDB = async (data: Category): Promise<Category> => {
  const result = prisma.category.create({
    data,
  });
  return result;
};

export const getAllCategoryFromDBService = async () => {
  const result = await prisma.category.findMany({});
  return result;
};

export const getSingleCategoryFromDBService = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const updateCategoryFromDBService = async (
  id: string,
  payload: Partial<Category>
) => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const deleteCategoryFromDBService = async (
  id: string
): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};
