import koa from 'koa'
import Router from 'koa-router'
const router = new Router({
    prefix: '/v1'
})
const api = new koa()
import getAllKinds from '../services/kindService'

router.get('/card/kind', async ctx => {
    try {
        const kinds = await getAllKinds()
        if (kinds.length > 0) {
            ctx.body = kinds
            ctx.status = 200
    }
    } catch (error) {
        console.log(error)
        ctx.body = "Erro ao buscar as classes."
        ctx.status = 400
    }
})


api.use(router.routes())
module.exports = api