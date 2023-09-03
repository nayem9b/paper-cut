import { Book } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addBookToDBService = async (data: Book): Promise<Book> => {
  const result = prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

export const getAllBooksFromDBService = async () => {
  const result = await prisma.book.findMany({
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
