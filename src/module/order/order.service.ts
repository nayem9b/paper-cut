import { Order } from "@prisma/client";
import prisma from "../../shared/prisma";

// interface Orderedbook {
//   bookId: string;
//   quantity: number;
// }

// interface OrderedBook {
//   orderedBooks: Orderedbook[];
// }

interface UserInfo {
  userId: string;
  // Other properties of the user info object
}

export const postOrderToDBService = async (
  userInfo: UserInfo,
  orderedBooks: Order
): Promise<Order> => {
  console.log(orderedBooks);
  console.log(userInfo.userId)
  const result = prisma.order.create({
    data: {
    userId: userInfo.userId,
    orderedBooks: orderedBooks
    },
  });
  return result;
};
