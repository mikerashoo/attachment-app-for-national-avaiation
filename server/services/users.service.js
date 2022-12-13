import prisma from "../../prisma/prisma-client";
import HttpException from "../httpexception";

export const getProfile = async () => {
    const users = await prisma.user.findMany()
  
    if (!users) {
      throw new HttpException(404, {});
    }
  
    return users;
  };