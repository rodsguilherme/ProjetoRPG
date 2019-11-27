import koa from 'koa'
import Router from 'koa-router'
import database from '../database/connect'
const router = new Router({
    prefix: '/v1'
})
const jwt = require('../middleware/jwtMiddleware')
const api = new koa()
import { createCard, getCardByUser, getCardById, deleteCardbyId } from '../services/cardService'


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
        strength: body.strength,
        hp: body.hp
    }
    if (!card) {
        ctx.body = "Campos incorretos"
    }
    try {
        await createCard(card)
        ctx.body = "Card criado com sucesso!"
        ctx.status = 201
    } catch (err) {
        ctx.body = 'Erro ao criar o card'
        ctx.status = 400
    }
})

router.get('/card/saves/:idUser', async ctx => {
    const idUser = ctx.params.idUser

    try {
        const cards = await getCardByUser(idUser)
        if (cards.length > 0) {
            ctx.body = cards
            ctx.status = 200
        }
    } catch (error) {
        console.log(error);
        
        ctx.body = 'Opa, parece que não cards salvos.'
        ctx.status = 404
    }

})

router.get('/card/saveCard/:idCard', async ctx => {
    const idCard = ctx.params.idCard

    try {
        const cards = await getCardById(idCard)
        if (cards.length > 0) {
            ctx.body = cards
            ctx.status = 200
        }
    } catch (error) {
        console.log(error)
        ctx.body = 'Opa, parece que não cards salvos.'
        ctx.status = 404

    }
})

router.delete('/card/delete/:idCard', async ctx => {
    const idCard = ctx.params.idCard

    try {
        await deleteCardbyId(idCard)
        ctx.body = "Ficha deletada."
        ctx.status = 200
    } catch (error) {
        console.log(error)
        ctx.body = "Erro ao deletar a ficha."
        ctx.status = 400
    }
})

api.use(router.routes())
module.exports = api