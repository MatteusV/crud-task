import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/user-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  name: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByName(name)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordIsMatch = await compare(password, user.password)

    if (!passwordIsMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
