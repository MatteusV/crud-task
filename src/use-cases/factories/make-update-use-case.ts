import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { UpdateTaskUseCase } from '../tasks/update'

export function makeUpdateTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()

  const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository)

  return updateTaskUseCase
}
