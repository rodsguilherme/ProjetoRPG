import koa from 'koa';
import Router from 'koa-router';

const router = new Router({ prefix: '/v1' });
const api = new koa()

const jwt = require('../middlewares/jwtMiddleware')

import { createUser, getAllUsers, getUserById } from '../services/userServices'

router.get('/users', jwt, async (ctx) => {
    const users = await getAllUsers()
    if(users !== 0) {
        ctx.body = users
        ctx.status = 200
    }
    else {
        ctx.body = 'Ocorreu um erro ao retornar.'
        ctx.status = 400
    }
});

router.post('/users/signup', async ctx => {
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

router.get('/users/:id', jwt, async (ctx) => {
    const id = ctx.params.id

    const user = await getUserById(id)

    if (user.length !== 0) {
        ctx.body = user
        ctx.status = 200
    }
    else {
        ctx.body = "Erro ao retornar o usuário."
        ctx.status = 404
    }
})

router.put('/users/update', async ctx => {

})

api.use(router.routes())
module.exports = api