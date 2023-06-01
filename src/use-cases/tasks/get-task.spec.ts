import { beforeEach, describe, expect, it } from 'vitest'
import { GetTaskUseCase } from './get-task'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'

let taskRespository: InMemoryTaskRepository
let sut: GetTaskUseCase

describe('Get task Use Case', () => {
  beforeEach(() => {
    taskRespository = new InMemoryTaskRepository()
    sut = new GetTaskUseCase(taskRespository)
  })

  it('should be able to get task', async () => {
    const createdTask = await taskRespository.create({
      title: 'teste',
      description: 'teste',
      user_id: 'açskdjapisjd',
    })

    const { task } = await sut.execute(createdTask.id)

    expect(task.title).toEqual('teste')
  })
})
