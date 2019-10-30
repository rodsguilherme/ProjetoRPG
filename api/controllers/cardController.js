import koa from 'koa'
import Router from 'koa-router'
const router = new Router()

const api = new koa()


router.get('/generator/w', ctx => {
    ctx.body = 'Arrozaaaaaaaa'
})


api.use(router.routes())
module.exports =  api