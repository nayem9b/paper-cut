import { Order } from "@prisma/client";
import prisma from "../../shared/prisma";

interface UserInfo {
  userId: string;
  role: string;
}

export const postOrderToDBService = async (
  userInfo: UserInfo,
  orderedBooks: Order
) => {
  if (userInfo.role === "customer") {
    const result = prisma.order.create({
      data: {
        userId: userInfo.userId,
        orderedBooks: orderedBooks,
      },
    });
    return result;
  } else {
    return {
      data: "You are not authorized",
    };
  }
};

export const getAllOrdersByAdmin = async (userInfo: UserInfo) => {
  console.log(userInfo);

  if (userInfo?.role === "admin") {
    const result = await prisma.order.findMany({});
    return {
      data: result,
    };
  } else if (userInfo?.role === "customer") {
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
export const getOrdersOfCustomerByOrderIdFromDB = async (
  userInfo: UserInfo,
  orderId: string
) => {
  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (result?.userId === userInfo.userId) {
    return result;
  } else if (userInfo?.role === "admin") {
    const result = await prisma.order.findMany({});
    return result;
  }
  console.log(result);
};
