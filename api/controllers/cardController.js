import koa from 'koa'
import Router from 'koa-router'
const router = new Router({
    prefix: '/v1'
})
const jwt = require('../middleware/jwtMiddleware')
const api = new koa()

router.post('/card/create', jwt, async ctx => {
    const { body } = ctx.request
    const card = {
        race: body.race,
        kind: body.kind,
        dexterity: body.dexterity,
        constitution: body.dexterity,
        winsdow: body.winsdow,
        intelligence: body.intelligence,
        charisma: body.charisma,
        private: body.private
    }
})



api.use(router.routes())
module.exports = api