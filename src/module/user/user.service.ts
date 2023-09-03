import { User } from "@prisma/client";
import prisma from "../../shared/prisma";

export const signUpUserToDBService = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });
  return result;
};

export const getAllUsersFromDBService = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

export const getSingleUserFromDBService = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const updateSingleUserFromDBService = async (
  id: string,
  payload: Partial<User>
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
