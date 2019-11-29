import koa from 'koa';
import Router from 'koa-router';
import nodemailer from 'nodemailer';
const router = new Router({ prefix: '/v1' });
const api = new koa()

const jwt = require('../middleware/jwtMiddleware')


import { generateToken } from '../services/authService'
import { createUser, getAllUsers, getUserById, login, getUserByEmail } from '../services/userServices'

router.get('/users', jwt, async (ctx) => {
    const users = await getAllUsers()
    if (users !== 0) {
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
        email: ctx.request.body.email,
        password: ctx.request.body.password
    }

    try {

        await createUser(user)
        const userCredencials = await getUserByEmail(user.email)
        const token = generateToken(userCredencials[0].idUser, userCredencials[0].username)
        ctx.body = { message: "Usuário cadastrado com sucesso.", token }
        ctx.status = 201
    } catch (error) {

        ctx.body = error
        ctx.status = 400
    }
})

router.get('/users/:id', async (ctx) => {
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

router.get('/user', jwt, async ctx => {
    const userLogged = ctx.state.user
    try {
        ctx.body = userLogged
        ctx.status = 200
    } catch (error) {
        console.log(error)
        ctx.body = "Token is null"
        ctx.status = 404
    }
})

api.use(router.routes())
module.exports = api