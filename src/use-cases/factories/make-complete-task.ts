import { PrismaTaskRepository } from '../../repositories/prisma/prisma-task-repository'
import { CompleteTaskUseCase } from '../tasks/complete'

export function makeCompleteTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()

  const completeTaskUseCase = new CompleteTaskUseCase(tasksRepository)

  return completeTaskUseCase
}
