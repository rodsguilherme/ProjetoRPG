import koa from 'koa';
import Router from 'koa-router';

const router = new Router({ prefix: '/v1' });
const api = new koa()
import { generateToken } from '../services/authService'
import { login, getUserByName } from '../services/userServices'

router.post('/login', async ctx => {
    const user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    const connected = await login(user)

    if(connected) {
        const userId = await getUserByName(user.username)
        const token = generateToken(userId)
        ctx.body = {token} 
        ctx.status = 200
    }
    else {
        ctx.body = "Não foi possivel conectar."
        ctx.status = 401
    }
    
})


api.use(router.routes())
module.exports = api