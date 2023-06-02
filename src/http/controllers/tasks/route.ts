import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { getTaskById } from './get-task-by-id'
import { fetchAll } from './fetch-all'
import { deleteTask } from './delete'
import { complete } from './complete'
import { update } from './update'
export async function tasksRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tasks', create)
  app.delete('/tasks/:taskId', deleteTask)

  app.patch('/tasks/complete/:taskId', complete)
  app.put('/tasks/update/:taskId', update)

  app.get('/tasks', fetchAll)
  app.get('/get/:taskId', getTaskById)
}
