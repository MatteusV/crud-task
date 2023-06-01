import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { GetTaskUseCase } from '../tasks/get-task'

export function makeGetTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()

  const getTaskUseCase = new GetTaskUseCase(tasksRepository)

  return getTaskUseCase
}
