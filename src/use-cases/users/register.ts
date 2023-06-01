import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  password: string
}
interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameName = await this.usersRepository.findByName(name)

    if (userWithSameName) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      password: password_hash,
    })

    return { user }
  }
}
