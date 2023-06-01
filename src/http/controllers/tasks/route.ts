import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { getTaskById } from './get-task-by-id'
import { fetchAll } from './fetch-all'
import { deleteTask } from './delete'
import { complete } from './complete'
export async function tasksRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tasks', create)
  app.post('/task/:taskId', deleteTask)

  app.put('/task/complete/:taskId', complete)

  app.get('/tasks', fetchAll)
  app.get('/get/:taskId', getTaskById)
}
