// app/utils/kudos.server.ts

import { prisma } from './prisma.server'
import { KudoStyle } from '@prisma/client'

export const createKudo = async (message: string, userId: string, recipientId: string, style: KudoStyle) => {
  await prisma.kudo.create({
    data: {
      // 1
      message,
      style,
      // 2
      author: {
        connect: {
          id: userId,
        },
      },
      recipient: {
        connect: {
          id: recipientId,
        },
      },
    },
  })
}