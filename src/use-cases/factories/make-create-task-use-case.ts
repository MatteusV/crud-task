import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { CreateTaskUseCase } from '../tasks/create'

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const usersRepository = new PrismaUserRepository()

  const createTaskUseCase = new CreateTaskUseCase(
    tasksRepository,
    usersRepository,
  )

  return createTaskUseCase
}
