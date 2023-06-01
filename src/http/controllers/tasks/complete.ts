import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCompleteTaskUseCase } from '../../../use-cases/factories/make-complete-task'

export async function complete(request: FastifyRequest, reply: FastifyReply) {
  const taskIdRequestParamsSchema = z.object({
    taskId: z.string(),
  })

  const { taskId } = taskIdRequestParamsSchema.parse(request.params)

  const useCase = makeCompleteTaskUseCase()

  const task = await useCase.execute(taskId)

  reply.status(201).send({ task })
}
