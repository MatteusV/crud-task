import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '../users/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository()

  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
