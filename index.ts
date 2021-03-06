import { ApolloServer } from 'apollo-server-express'
import http from 'http'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
// import schema from './schema'
import { pool } from './db'
import { app } from './app'
import { origin, port, secret } from './env'
import { MyContext } from './context'
import sql from 'sql-template-strings'
const { PostgresPubSub } = require('graphql-postgres-subscriptions')
import { UnsplashApi } from './schema/unsplash.api'
import * as commonModule from './modules/common'
import * as usersModule from './modules/users'
import * as chatsModule from './modules/chats'

const pubsub = new PostgresPubSub({
  host: 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: 'postgres',
  password: '19851110',
  database: 'whatsapp',
})

const server = new ApolloServer({
  modules: [commonModule, usersModule, chatsModule] as any,
  context: async (session: any) => {
    let req = session.connection
      ? session.connection.context.request
      : session.req
    if (session.connection) {
      req.cookies = cookie.parse(req.headers.cookie || '')
    }

    let currentUser
    if (req.cookies.authToken) {
      const username = jwt.verify(req.cookies.authToken, secret) as string
      if (username) {
        const { rows } = await pool.query(
          sql`SELECT * FROM users WHERE username = ${username}`
        )
        currentUser = rows[0]
      }
    }

    let db

    if (!session.connection) {
      db = await pool.connect()
    }

    return {
      pubsub,
      db,
      currentUser,
      res: session.res,
    }
  },
  subscriptions: {
    onConnect(params, ws, ctx) {
      return {
        request: ctx.request,
      }
    },
  },
  formatResponse: (res: any, { context }: { context: MyContext }) => {
    context.db.release()
    return res
  },
  dataSources: () => ({
    unsplashApi: new UnsplashApi(),
  }),
})

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: { credentials: true, origin },
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
