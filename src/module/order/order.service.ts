import { Order, Book, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import {
  IBookFilterRequest,
  bookSearchableFields,
} from "../book/book.constant";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IGenericResponse } from "../../interface/common";

interface UserInfo {
  userId: string;
  role: string;
}

export const postOrderToDBService = async (
  userInfo: UserInfo,
  orderedBooks: Order
): Promise<Order> => {
  console.log(orderedBooks);
  console.log(userInfo.userId);
  const result = prisma.order.create({
    data: {
      userId: userInfo.userId,
      orderedBooks: orderedBooks,
    },
  });
  return result;
};

export const getAllOrdersByAdmin = async (userInfo: UserInfo) => {
  console.log(userInfo);
  if (userInfo?.role === "admin") {
    console.log("im 1");
    const result = await prisma.order.findMany({});
    return {
      data: result,
    };
  } else if (userInfo?.role === "customer") {
    console.log("im 2");
    const result = await prisma.order.findMany({
      where: {
        userId: userInfo?.userId,
      },
    });
    return {
      data: result,
    };
  } else {
    return {
      data: "You are not authorized",
    };
  }
};
