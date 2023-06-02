import { Prisma, Task } from '@prisma/client'
import { TaskRespository, UpdateOptions } from '../task-repository'
import { randomUUID } from 'crypto'

export class InMemoryTaskRepository implements TaskRespository {
  public items: Task[] = []

  async fetchTaskByUserId(userId: string) {
    const task = this.items.filter((item) => item.user_id === userId)

    if (!task) {
      return null
    }

    return task
  }

  async findByTitle(title: string) {
    const task = this.items.find((item) => item.title === title)

    if (!task) {
      return null
    }

    return task
  }

  async create(data: Prisma.TaskCreateInput) {
    const task: Task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      created_at: new Date(),
      user_id: data.user_id,
      completed_at: null,
      updated_at: new Date(),
    }

    this.items.push(task)

    return task
  }

  async findById(id: string) {
    const task = this.items.find((item) => item.id === id)

    if (!task) {
      return null
    }

    return task
  }

  async delete(id: string) {
    const findTask = this.items.findIndex((item) => item.id === id)

    this.items.splice(findTask)

    return null
  }

  async complete(id: string) {
    const task = this.items.find((item) => item.id === id)

    if (!task) {
      return null
    }

    task.completed_at = new Date()

    this.items.push(task)

    return task
  }

  async update({ id, description, title }: UpdateOptions) {
    const task = this.items.find((item) => item.id === id)

    if (!task) {
      return null
    }

    if (title && description) {
      task.title = title
      task.description = description
    }

    if (title && !description) {
      task.title = title
    }

    if (!title && description) {
      task.description = description
    }

    if (!title && !description) {
      return null
    }

    this.items.push(task)
    task.updated_at = new Date()

    return task
  }
}
