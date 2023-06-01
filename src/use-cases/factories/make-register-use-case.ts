import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { RegisterUseCase } from '../users/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()

  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
