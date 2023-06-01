import { Task } from '@prisma/client'
import { TaskRespository } from '../../repositories/task-repository'
import { UsersRepository } from '../../repositories/user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateTaskUseCaseRequest {
  title: string
  description: string
  userId: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskRespository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const task = await this.taskRepository.create({
      title,
      description,
      user_id: userId,
    })

    return { task }
  }
}
