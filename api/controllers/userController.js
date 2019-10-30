import koa from 'koa';
import Router from 'koa-router';

const router = new Router({ prefix: '/v1' });
const api = new koa()

import { createUser, getAllUsers } from '../services/userServices'
router.get('/users', async (ctx) => {
    const users = await getAllUsers()
    if (users.length > 0) {
        ctx.body = users
        ctx.status = 200
    }
    else {
        ctx.body = "Ocorreu um erro ao retornar os usuários"
        ctx.status = 400
    }
});

router.post('/signup', async ctx => {
    const user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    try {
        await createUser(user)
        ctx.body = "Usuário cadastrado com sucesso."
        ctx.status = 201
    } catch (error) {
        ctx.body = "Ocorreu algum erro ao cadastrar."
        ctx.status = 400
    }
})

api.use(router.routes())
module.exports = api