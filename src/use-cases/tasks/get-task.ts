import { TaskRespository } from '../../repositories/task-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetTaskUseCase {
  constructor(private taskRepository: TaskRespository) {}

  async execute(taskId: string) {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return { task }
  }
}
