import prisma from "./prisma";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      password: true,
    },
  });
};

export const createUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return prisma.user.create({
    data: { email, name: username, password },
    select: {
      id: true,
      name: true,
    },
  });
};
