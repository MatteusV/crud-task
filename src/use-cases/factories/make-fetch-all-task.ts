import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { FetchAllTaskUseCase } from '../tasks/fetch-all-task'

export function makeFetchTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const usersRepository = new PrismaUserRepository()

  const fetchTaskUseCase = new FetchAllTaskUseCase(
    tasksRepository,
    usersRepository,
  )

  return fetchTaskUseCase
}
