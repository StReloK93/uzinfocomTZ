const jsonServer = require('json-server')
const middleware = require('./middleware.cjs')
const server = jsonServer.create()

const router = jsonServer.router('./backend/db.json')

const middlewares = jsonServer.defaults()
server.use(middleware)
server.use(middlewares)
server.use(router)
const port = 10000
server.listen(port, '0.0.0.0', () => {
  console.log(`Json Server is running on port ${port}`)
})
