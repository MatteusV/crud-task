import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateTaskUseCase } from '../../../use-cases/factories/make-update-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const taskIdRequestParamsSchema = z.object({
    taskId: z.string(),
  })

  const updateRequestBodySchema = z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
  })

  const { taskId } = taskIdRequestParamsSchema.parse(request.params)
  const { description, title } = updateRequestBodySchema.parse(request.body)

  const useCase = makeUpdateTaskUseCase()

  if (!title && !description) {
    return reply.status(400).send({ message: 'Missing description or title' })
  }

  if (!title && description) {
    const task = await useCase.execute({
      id: taskId,
      description,
    })

    return reply.status(200).send({ task })
  }

  if (title && !description) {
    const task = await useCase.execute({
      id: taskId,
      title,
    })

    return reply.status(200).send({ task })
  }

  if (title && description) {
    const task = await useCase.execute({
      id: taskId,
      title,
      description,
    })

    return reply.status(200).send({ task })
  }
}
