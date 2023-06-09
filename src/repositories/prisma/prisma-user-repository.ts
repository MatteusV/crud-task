import { Prisma } from '@prisma/client'
import { UsersRepository } from '../user-repository'
import { prisma } from '../../lib/prisma'
export class PrismaUserRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByName(name: string) {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
