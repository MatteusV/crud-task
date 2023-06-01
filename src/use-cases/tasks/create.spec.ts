import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { CreateTaskUseCase } from './create'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'

let usersRepository: InMemoryUserRepository
let taskRepository: InMemoryTaskRepository
let sut: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUserRepository()
    taskRepository = new InMemoryTaskRepository()
    sut = new CreateTaskUseCase(taskRepository, usersRepository)
  })

  it('should be able to create task', async () => {
    const user = await usersRepository.create({
      name: 'teste',
      password: 'teste123123',
    })

    const { task } = await sut.execute({
      title: 'teste',
      description: 'teste',
      userId: user.id,
    })

    expect(task.id).toEqual(expect.any(String))
  })
})
