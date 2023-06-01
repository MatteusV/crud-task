import { TaskRespository } from '../../repositories/task-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class CompleteTaskUseCase {
  constructor(private taskRepository: TaskRespository) {}

  async execute(taskId: string) {
    const task = await this.taskRepository.complete(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return { task }
  }
}
