import {
  TaskRespository,
  UpdateOptions,
} from '../../repositories/task-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRespository) {}

  async execute(query: UpdateOptions) {
    const task = await this.taskRepository.update(query)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return { task }
  }
}
