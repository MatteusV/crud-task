import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/in-memory/in-memory-task-repository'
import { FetchAllTaskUseCase } from './fetch-all-task'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'

let taskRespository: InMemoryTaskRepository
let usersRepository: InMemoryUserRepository
let sut: FetchAllTaskUseCase

describe('Fetch All Task Use Case', () => {
  beforeEach(() => {
    taskRespository = new InMemoryTaskRepository()
    usersRepository = new InMemoryUserRepository()
    sut = new FetchAllTaskUseCase(taskRespository, usersRepository)
  })

  it('should be able to get task', async () => {
    const user = await usersRepository.create({
      name: 'matteus',
      password: '12345678',
    })

    await taskRespository.create({
      title: 'teste 1',
      description: 'teste description',
      user_id: user.id,
    })

    await taskRespository.create({
      title: 'teste 2',
      description: 'teste description',
      user_id: user.id,
    })

    await taskRespository.create({
      title: 'teste 3',
      description: 'teste description',
      user_id: user.id,
    })

    const tasks = await sut.execute(user.id)

    expect(tasks).toHaveLength(3)
  })
})
