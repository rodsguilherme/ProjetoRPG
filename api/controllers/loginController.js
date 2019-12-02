import koa from 'koa';
import Router from 'koa-router';

const router = new Router({ prefix: '/v1' });
const api = new koa()
import { generateToken } from '../services/authService'
import { login, getUserByEmail } from '../services/userServices'

router.post('/login', async ctx => {
    const user = {
        email: ctx.request.body.email,
        password: ctx.request.body.password
    }

    try {
        await login(user)
        const userCredencials = await getUserByEmail(user.email)
       
        const token = generateToken(userCredencials[0].idUser, userCredencials[0].username)
        ctx.body = { connected: 'Conectado com sucesso', token }
        ctx.status = 200

    } catch (error) {
        ctx.body = error
        ctx.status = 400
    }



})


api.use(router.routes())
module.exports = api