import koa from 'koa'
import Router from 'koa-router'
import database from '../database/connect'
const router = new Router({
    prefix: '/v1'
})
const jwt = require('../middleware/jwtMiddleware')
const api = new koa()
import createCard from '../services/cardService'

router.post('/card/create', async ctx => {
    const { body } = ctx.request
    const card = {
        name: body.name,
        alignment: body.alignment,
        idRace: body.idRace,
        idKind: body.idKind,
        charisma: body.charisma,
        intelligence: body.intelligence,
        dexterity: body.dexterity,
        winsdow: body.winsdow,
        constitution: body.constitution,
        strength: body.strength
    }
    if (!card) {
        ctx.body = "Campos incorretos"
    }
    try {
        await createCard(card)
        ctx.body = "Card criado com sucesso!"
        ctx.status = 201
    }catch(err) {
        console.log(err)
        ctx.body = 'Erro ao criar o card'
        ctx.status = 400
    }
})



api.use(router.routes())
module.exports = api