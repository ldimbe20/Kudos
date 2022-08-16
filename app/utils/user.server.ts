// app/utils/user.server.ts
import bcrypt from 'bcryptjs'
import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'
import type{ Profile } from "@prisma/client";

export const updateUser = async (userId: string, profile: Partial<Profile>) => {
  // ! Partial profile makes all properties in profile optional to fill out, only update what user updates
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  });
};


export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  })
  return { id: newUser.id, email: user.email }
}

export const getOtherUsers = async (userId: string) => {
  return prisma.user.findMany({
    where: {
      id: { not: userId },
// ! The where filter excludes any documents whose id matches the userId 
// !parameter. This will be used to grab every user except the currently logged in user.
    },
    orderBy: {
      profile: {
        firstName: 'asc',
      },
    },
  })
}

// app/utils/user.server.ts

// ...

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}