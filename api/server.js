const koa = require('koa');
const cors = require('@koa/cors')
const Router = require('koa-router');
const mount = require('koa-mount')
const koaBody = require('koa-body');
const respond = require('koa-respond')
const jwt = require('koa-jwt')
const jwtMiddleware = require('./middleware/jwtMiddleware')


const api = new koa();

api.use(cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  exposeHeaders: ['X-Request-Id']
}));
api.use(koaBody(({ multipart: true })))


api.use(mount(require('./controllers/userController')))
api.use(mount(require('./controllers/cardController')))
api.use(mount(require('./controllers/loginController')))
api.use(mount(require('./controllers/cardController')))
api.use(mount(require('./controllers/raceController')))
api.use(mount(require('./controllers/kindController')))

api.use(jwt({
  secret: 'supersecret',
  jwtMiddleware
}).unless({
  path: [
    '/v1/login',
    'v1/users/signup',
    '/v1/card/create',
    '/v1/races',
    '/v1/card/saves/:idRace/:idKind',
    '/v1/card/saveCard/:idCard',
    '/v1/card/delete/:idCard',
    '/v1/card/kinds'

  ]
}))

const router = new Router();

api.use(respond())
api.use(router.routes())
api.use(router.allowedMethods())


const port = 3000
api.listen(port, (() => console.log(`Running at ${port}`)))