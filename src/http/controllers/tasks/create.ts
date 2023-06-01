import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '../../../use-cases/factories/make-create-task-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createRequestBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const userIdCookiesSchema = z.object({
    sub: z.string(),
  })

  const { title, description } = createRequestBodySchema.parse(request.body)

  const { sub } = userIdCookiesSchema.parse(request.user)

  const useCase = makeCreateTaskUseCase()

  const task = await useCase.execute({
    title,
    description,
    userId: sub,
  })

  reply.status(201).send({ task })
}
