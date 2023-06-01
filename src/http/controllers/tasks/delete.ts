import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteTaskUseCase } from '../../../use-cases/factories/make-delete-task'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const createRequestParamsSchema = z.object({
    taskId: z.string(),
  })

  const { taskId } = createRequestParamsSchema.parse(request.params)

  const useCase = makeDeleteTaskUseCase()

  await useCase.execute(taskId)

  reply.status(201).send({ message: 'Task deleted successfully' })
}
