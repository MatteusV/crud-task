import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../user-repository'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByName(name: string) {
    const user = this.items.find((item) => item.name === name)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      password: data.password,
    }

    this.items.push(user)

    return user
  }
}
