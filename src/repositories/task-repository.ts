import { Prisma, Task } from '@prisma/client'

export interface UpdateOptions {
  id: string
  title?: string
  description?: string
}

export interface TaskRespository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  fetchTaskByUserId(userId: string): Promise<Task[] | null>
  findById(id: string): Promise<Task | null>
  delete(id: string): Promise<null>
  complete(id: string): Promise<Task | null>
  update(query: UpdateOptions): Promise<Task | null>
}
