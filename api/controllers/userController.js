const express = require('express');
const router = express.Router();

// Importa o Json Web Tokens do Express
const expressJwt = require('express-jwt')

const jwt = require('jsonwebtoken')

// Importa md5 hash
const md5 = require('md5')

// MiidleWare para usar em função que recebe a senha de acesso
const jwtMiddleWare = expressJwt({ secret: 'supersecretpass' });

// Senha de acesso ao token
const jwtSecret = 'supersecretpass'

// Importa o banco de dados
const database = require("../database/ConnectDB")


// Cadastro de usuarios
router.post('/', (request, response) => {
    const { username, password } = request.body

    if (username && password ) {
        database.serialize(() => {
            const select = 'SELECT username FROM User WHERE username = ?'
            database.all(select, [username], (err, row) => {
                if (row.length > 0)
                    response.status(401).json({ sucess: false, err: 'Nome de usuário já existe!' })
                else {
                    const insert = 'INSERT INTO User (username, password) VALUES (?,?)'
                    database.run(insert, [username, md5(password)], (err) => {
                        if (err)
                            response.status(400).json({ sucess: false, err: 'Não foi possivel faz o cadastro, por favor tente mais tarde!' })
                        else
                            response.status(201).json({ sucess: 'Usuario criado com sucesso!', err: false })
                    })
                }
            })

        })
    }
    else 
        response.status(400).json({ sucess: false, err: 'Preencha os campos corretamente!'})
    

})

// Login de usuarios
router.post('/login', (request, response) => {
    const { username, password } = request.body
    if (username && password) {
        const select = 'SELECT id FROM User WHERE username = ? and password = ?'
        database.serialize(() => {
            database.all(select, [username, md5(password)], (err, row) => {
                if (err)
                    response.status(400).json({ sucess: false, err: err.message })
                else if (row.length > 0) {
                    const token = jwt.sign({ id: row }, jwtSecret)
                    response.status(200).json({ sucess: 'Usuário conectado com sucesso!', err: false, token })
                }
                else
                    response.status(404).json({ sucess: false, err: 'Usuário ou senha está incorreta!' })

            })
        })
    }
    else
        response.status(400).json({ sucess: false, err: 'Preencha os campos corretamente!' })
})


// Edita dados usuario
router.put('/:id', jwtMiddleWare, (request, response) => {
    const id = request.params.id
    const username = request.body.username
    if (username) {
        database.serialize(() => {
            database.all('SELECT id FROM User where id = ?', [id], (err, rows) => {
                if (rows.length === 0) {
                    response.status(404).json({ sucess: false, err: 'Usuário não existe!' })
                }
                else
                    database.all('SELECT username FROM User where username = ?', [username], (err, row) => {
                        if (row.length > 0) {
                            response.status(404).json({ sucess: false, err: 'Nome de usuário já cadastrado!' })
                        }
                        else {
                            database.run('UPDATE User SET username = ? WHERE id = ?', [username, id], (err) => {
                                if (!err) {
                                    response.status(200).json({ sucess: 'Nome alterado com sucesso!', err: false })
                                }
                                else {
                                    response.status(404).json({ sucess: false, err: err.message })
                                }
                            })
                        }
                    })

            })
        })
    }
    else {
        response.status(400).send('Preencha corretamente os campos!!')
    }
})

// DELETA Usuario POR ID
router.delete('/:id', jwtMiddleWare, (request, response) => {
    const id = request.params.id
    if (id && id !== 0) {
        database.serialize(() => {
            const deleteSql = 'DELETE FROM User WHERE id = ?'
            database.run(deleteSql, [id], (err) => {
                if (err) {
                    response.status(400).json({ sucess: false, err: err.message })
                }
                else {
                    response.status(200).json({ sucess: 'User deletado com sucesso!', err: false })
                }
            })
        })
    }
    else
        response.status(404).json({ sucess: false, err: "Id informado não existe" })
})



// Retorna todos os usuarios cadastrados
router.get('/', jwtMiddleWare, (request, response) => {
    database.serialize(() => {
        const select = 'SELECT * FROM User'
        database.all(select, (err, row) => {
            if (!err)
                response.status(200).json({ sucess: row, err: false })
            else
                response.status(404).send({ sucess: false, err: err.message })

        })
    })
})


// Retorna usuario pelo Id
router.get('/:id', jwtMiddleWare, (request, response) => {
    const id = request.params.id
    database.serialize(() => {
        const select = 'SELECT username, password FROM User where id = ?'
        database.all(select, [id], (err, row) => {
            if (err) {
                response.status(400).json({ sucess: false, err: err.message })
            }
            else if (row.length > 0) {
                response.status(200).json({ sucess: row, err: false })
            }
            else {
                response.status(404).json({ sucess: false, err: 'Usuário ou senha incorreta!' })
            }

        })
    })
})


module.exports = (api) => api.use('/api/User', router)
