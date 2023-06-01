import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { DeleteTaskUseCase } from '../tasks/delete'

export function makeDeleteTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()

  const createTaskUseCase = new DeleteTaskUseCase(tasksRepository)

  return createTaskUseCase
}
