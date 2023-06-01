import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/route'
import { tasksRoutes } from './http/controllers/tasks/route'

export const app = Fastify()

app.register(usersRoutes)
app.register(tasksRoutes)
app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: 'crud-task',
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
