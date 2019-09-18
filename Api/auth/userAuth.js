const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const jwtMiddleWare = expressJwt({
    secret: 'supersecretpass'
});



const md5 = require('md5')
const database = require('../database/ConnectDB')

router.post('/login', (request, response) => {
    const username = request.body.username
    const password = md5(request.body.password)

    if (username && password) {
        database.serialize(() => {
            //const select = 'SELECT id FROM Usuario WHERE username = ? AND password = ? '
            database.all('SELECT id FROM User where username = ? and password = ?', [username, password], (error, row) => {
                if (error) {
                    response.status(400).send({ Erro: error.message })
                }
                else if (row.length > 0) {
                    const token = jwt.sign({ id: row }, 'supersecretpass');
                    response.json({ sucess: true, err: null, token })
                }
                else
                    response.status(404).json({ sucess: false, err: 'Usuário ou senha está incorreta!' })

            })
        })
    }
    else {
        response.status(404).send(' Preencha os campos corretamente! ')
    }
})


router.get('/', jwtMiddleWare, (request, response) => {
    response.send('Auth sucess')
})


module.exports = (api) => api.use('/api/auth', router)