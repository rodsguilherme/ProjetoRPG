import koa from 'koa'
import Router from 'koa-router'
import database from '../database/connect'
const router = new Router({
    prefix: '/v1'
})

const api = new koa()

import {getAllRaces} from '../services/raceService'

router.get('/races', async (ctx) => {
    const races = await getAllRaces()
    try {
        
        ctx.body = races
        ctx.status = 200 
    } catch (error) {
        console.log(error)
        ctx.body = "Erro ao buscar as raças"
        ctx.body = 400
    }
})

api.use(router.routes())
module.exports = api