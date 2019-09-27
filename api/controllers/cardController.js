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
    acrobatics: false,
    intimidation: false,
    athletics: false
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


})

module.exports = (api) => api.use('/api/card', router)