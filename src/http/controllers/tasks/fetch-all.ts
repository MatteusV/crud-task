import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchTaskUseCase } from '../../../use-cases/factories/make-fetch-all-task'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const userIdCookiesSchema = z.object({
    sub: z.string(),
  })

  const { sub } = userIdCookiesSchema.parse(request.user)

  const useCase = makeFetchTaskUseCase()

  const task = await useCase.execute(sub)

  reply.status(201).send({ task })
}
