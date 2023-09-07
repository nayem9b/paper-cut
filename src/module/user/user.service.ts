import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { createToken } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";

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

export const deleteByIdFromDBService = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const loginUserToDB = async (payload: User) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
      password: password,
    },
  });

  if (!isUserExist) {
    httpStatus.NOT_FOUND, "User does not exist";
  } else {
    const { id: userId, role } = isUserExist;
    // console.log(isUserExist);
    const accessToken: any | undefined = createToken(
      { userId, role },
      config.jwt.access_secret as Secret,
      config.jwt.access_expires_in as string
    );
    const refreshToken: any | undefined = createToken(
      { userId, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    // console.log(isUserExist, accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
};
