import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-profile'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'matteus',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute(createdUser.id)

    expect(user.name).toEqual('matteus')
  })

  it('should be able to get user profile with wrong id', async () => {
    await usersRepository.create({
      name: 'matteus',
      password: await hash('123456', 6),
    })

    const user_id = 'lasjfoiasj'

    await expect(() => sut.execute(user_id)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
