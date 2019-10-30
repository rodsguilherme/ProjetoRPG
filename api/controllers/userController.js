import koa from 'koa';
import Router from 'koa-router';
const router = new Router({
    prefix: '/v1'
});

import database from '../database/connect';
const api = new koa()
router.get('/get', async (ctx) => {
    try {
       const users = await database.select().from('User')
       ctx.body = users
    } catch (error) {
        ctx.body = "não deu bom"
    }
});

router.post('/siginup', async ctx => {
    const user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
 
    try {
        await database.insert({username: user.username, password: user.password}).into('User')
        ctx.body = "deu bom paring"
    } catch (error) {
        ctx.body = "deu ruim padri"
    }
})

api.use(router.routes())
module.exports = api