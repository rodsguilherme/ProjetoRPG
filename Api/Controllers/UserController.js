const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3')
 
const database = require("../database/ConnectDB")


router.get('/', (request, response) => {
    database.serialize(() => {
        database.all('SELECT username FROM Usuario', (err, row) => {
            if (!err)
                response.status(200).send({ Row:row })
            else
                response.status(400).send({ Erro: err.message })

        })
    })
})


module.exports = (api) => api.use('/api/User', router)
