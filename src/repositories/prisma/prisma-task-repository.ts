import { Prisma } from '@prisma/client'
import { TaskRespository, UpdateOptions } from '../task-repository'
import { prisma } from '../../lib/prisma'

export class PrismaTaskRepository implements TaskRespository {
  async fetchTaskByUserId(userId: string) {
    const task = await prisma.task.findMany({
      where: {
        user_id: userId,
      },
    })

    if (!task) {
      return null
    }

    return task
  }

  async findByTitle(title: string) {
    const task = await prisma.task.findFirst({
      where: {
        title,
      },
    })

    if (!task) {
      return null
    }

    return task
  }

  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({
      data,
    })

    return task
  }

  async findById(id: string) {
    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    })

    if (!task) {
      return null
    }

    return task
  }

  async delete(id: string) {
    await prisma.task.delete({
      where: {
        id,
      },
    })

    return null
  }

  async complete(id: string) {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        completed_at: new Date(),
      },
    })

    return task
  }

  async update({ id, description, title }: UpdateOptions) {
    if (description && title) {
      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
          description,
        },
      })

      return task
    }

    if (!title && description) {
      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          description,
        },
      })
      return task
    }

    if (title && !description) {
      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
        },
      })
      return task
    }

    return null
  }
}
