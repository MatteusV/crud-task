import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { CompleteTaskUseCase } from './complete'

let taskRepository: InMemoryTaskRepository
let sut: CompleteTaskUseCase

describe('Complete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new CompleteTaskUseCase(taskRepository)
  })

  it('must be able to complete a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'teste',
      description: 'teste',
      user_id: 'matteus',
    })

    const { task } = await sut.execute(createdTask.id)

    console.log(task)

    expect(task.completed_at).toEqual(expect.any(Date))
  })
})
