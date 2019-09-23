const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const jwtSecret = 'supersecretpass'
const jwtMiddleWare = expressJwt({ secret: 'supersecretpass' })

const database = require('../database/ConnectDB')


const races = {
    elf: { bonus: 2 },
    human: { bonus: 1 },
    dwarf: { bonus: 2 }
}


const classes = {
    warrior: { hp: 10 },
    mage: { hp: 6 },
    rogue: { hp: 8 }
}

const expertises = {
    acrobatics,
    intimidation,
    athletics

}

const attributes = {
    strength: 0,
    dexterity: 0,
    constution: 0,
    winsdom: 0,
    intelligence: 0,
    charisma: 0
}

router.post('/', jwtMiddleWare, (request, response) => {
    const { racesSelected, classes, expertises} = request.body
    if (racesSelected) {
        if (racesSelected === races.human) {
            attributes.strength = 1
            attributes.dexterity = 1
            attributes.constution = 1
            attributes.winsdom = 1
            attributes.intelligence = 1
            attributes.charisma = 1
            if (classes === classes.warrior) {
                classes.warrior.hp
            }
            else if (classes === classes.mage) {
                classes.mage.hp
            }
            else if (classes === classes.rogue) {
                classes.rogue.hp
                
            }
        }
        else if (racesSelected === races.dwarf) {
            response.json({ selected: races.dwarf.bonus, err: false })
        }
        else if (racesSelected === races.elf) {
            response.json({ selected: races.elf.bonus, err: false })
        }
    }
    else
        response.status(400).json({ sucess: false, err: 'Escolha uma raça!' })
})

module.exports = (api) => api.use('/api/card', router)