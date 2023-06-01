import { TaskRespository } from '../../repositories/task-repository'
import { UsersRepository } from '../../repositories/user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class FetchAllTaskUseCase {
  constructor(
    private taskRepository: TaskRespository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const task = await this.taskRepository.fetchTaskByUserId(userId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return task
  }
}
