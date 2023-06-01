import { TaskRespository } from '../../repositories/task-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRespository) {}

  async execute(id: string) {
    const task = await this.taskRepository.update(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return { task }
  }
}
