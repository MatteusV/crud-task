import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { DeleteTaskUseCase } from './delete'

let taskRepository: InMemoryTaskRepository
let sut: DeleteTaskUseCase

describe('Delete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new DeleteTaskUseCase(taskRepository)
  })

  it('must be able to delete a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'teste',
      description: 'teste',
      userId: 'matteus',
    })

    const { task } = await sut.execute(createdTask.id)

    expect(task).toBeNull()
  })
})
