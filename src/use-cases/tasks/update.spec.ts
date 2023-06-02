import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { UpdateTaskUseCase } from './update'

let taskRepository: InMemoryTaskRepository
let sut: UpdateTaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new UpdateTaskUseCase(taskRepository)
  })

  it('must be able to update a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'teste',
      description: 'teste description',
      user_id: 'matteus',
    })

    const { task } = await sut.execute({
      id: createdTask.id,
      title: 'teste updated',
      description: 'teste updated',
    })

    expect(task.title).toEqual('teste updated')
    expect(task.description).toEqual('teste updated')
  })

  it('should be able to update a task with just the description', async () => {
    const createdTask = await taskRepository.create({
      title: '123',
      description: '123 description',
      user_id: 'matteus',
    })

    const { task } = await sut.execute({
      id: createdTask.id,
      description: 'updated description',
    })

    expect(task.title).toEqual('123')
    expect(task.description).toEqual('updated description')
  })
})
