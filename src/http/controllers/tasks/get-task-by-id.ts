import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetTaskUseCase } from '../../../use-cases/factories/make-get-task-use-case'
import { z } from 'zod'

export async function getTaskById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCheckInParamsSchema = z.object({
    taskId: z.string(),
  })

  const { taskId } = getCheckInParamsSchema.parse(request.params)
  const getTaskUseCase = makeGetTaskUseCase()

  const task = await getTaskUseCase.execute(taskId)

  return reply.status(200).send({
    task,
  })
}
