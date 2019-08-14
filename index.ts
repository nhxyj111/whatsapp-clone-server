import { ApolloServer, gql, PubSub } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'
import cookie from 'cookie'
import { chats } from './db'
import schema from './schema'
import { users } from './db'

const app = express()

const origin = process.env.ORIGIN || 'http://localhost:3000'
app.use(cors({ credentials: true, origin }))
app.use(express.json())
app.use(cookieParser())

app.get('_ping', (req, res) => {
  res.send('pong')
})

app.get('/chats', (req, res) => {
  res.json(chats)
})

const pubsub = new PubSub()
const server = new ApolloServer({
  schema,
  context: (session: any) => {
    let req = session.connection
      ? session.connection.context.request
      : session.req
    if (session.connection) {
      req.cookies = cookie.parse(req.headers.cookie || '')
    }
    return {
      currentUser: users.find(u => u.id === req.cookies.currentUserId),
      pubsub,
    }
  },
  subscriptions: {
    onConnect(params, ws, ctx) {
      return {
        request: ctx.request,
      }
    },
  },
})

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: { credentials: true, origin },
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const port = process.env.PORT || 4000

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
