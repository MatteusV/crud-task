import { TaskRespository } from '../../repositories/task-repository'

export class DeleteTaskUseCase {
  constructor(private taskRespository: TaskRespository) {}

  async execute(taskId: string) {
    const task = await this.taskRespository.delete(taskId)

    return { task }
  }
}
