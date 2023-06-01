import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../users/get-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository()

  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
