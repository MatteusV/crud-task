import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from './register'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'matteus',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'matteus',
      password: '123456',
    })

    const passwordMatch = await compare('123456', user.password)

    expect(passwordMatch).toBe(true)
  })

  it('should not be able to register with same name twice', async () => {
    const name = 'matteus'

    await sut.execute({
      name,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
