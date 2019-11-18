import koa from 'koa'
import Router from 'koa-router'
import database from '../database/connect'
const router = new Router({
    prefix: '/v1'
})
const jwt = require('../middleware/jwtMiddleware')
const api = new koa()

router.post('/card/create', async ctx => {
    const { body } = ctx.request
    const card = {
        name: body.name,
        alignment: body.alignment,
        race: body.race,
        kind: body.kind,
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
        await database.insert({
            name: card.name, alignment: card.alignment, race: card.race, kind: card.kind,
            charisma: card.intelligence, intelligence: card.intelligence, dexterity: card.dexterity, winsdow: card.winsdow,
            constitution: card.constitution, strength: card.strength
        }).into('Card')
        ctx.body = "Card criado com sucesso!"
        ctx.status = 201
    }catch(er) {
        ctx.body = 'Erro ao criar o card'
        ctx.status = 400
    }
})



api.use(router.routes())
module.exports = api