const express = require('express');
const router = express.Router();

const expressJwt = require('express-jwt')
const md5 = require('md5');

// Importa o banco de dados
const database = require("../database/ConnectDB")

// Insere os usuarios
router.post('/', (request, response) => {
    const username = request.body.username
    const password = request.body.password

    if (!username && !password) {
        response.status(400).send('Preencha os campos corretamente!')
    }
    else {
        database.serialize(() => {
            database.all('SELECT username from User where username = ?', [username], (erro, row) => {
                if (row.length > 0)
                    response.status(400).send('Usuário já existe!')
                else {
                    const insert = 'INSERT INTO User (username, password) VALUES (?,?)'

                    database.run(insert, [username, md5(password)], (err, row) => {
                        if (err)
                            response.status(400).send({ Erro: err.message })
                        else
                            response.status(200).send('Usuario criado com sucesso!')

                    })
                }
            })

        })
    }

})

// Atualiza os usuarios 
router.put('/:id', (request, response) => {
    const id = request.params.id
    const username = request.body.username
    if (username) {
        database.serialize(() => {
            database.all('SELECT id FROM User where id = ?', [id], (err, rows) => {
                if (rows.length === 0) {
                    response.status(404).send('Usuário não existe!')
                }
                else
                    database.all('SELECT username FROM User where username = ?', [username], (err, row) => {
                        if (row.length > 0) {
                            response.status(404).send('Nome de usuáirio já cadastrado!')
                        }
                        else {
                            database.run('UPDATE User set username = ? where id = ?', [username, id], (err) => {
                                if (!err) {
                                    response.status(200).send('Usuário alterado com sucesso!')
                                }
                                else {
                                    response.status(404).send()
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
router.delete('/:id', (request, response) => {
    const id = request.params.id
    database.serialize(() => {
        const deleteSql = 'DELETE FROM User WHERE id = ?'
        database.run(deleteSql, [id], (err) => {
            if (err) {
                response.status(400).send({ Erro: err })
            }
            else {
                response.status(200).send('User deletado com sucesso!')
            }
        })
    })
})



// Retorna todos os usuarios cadastrados
router.get('/', expressJwt({secret: 'supersecretpass'}),(request, response) => {
    database.serialize(() => {
        const select = 'SELECT id, username, password FROM User'
        database.all(select, (err, row) => {
            if (!err)
                response.status(200).send({ Row: row })
            else
                response.status(404).send({ Erro: err.message })

        })
    })
})

router.get('/:id', (request, response) => {
    const id = request.params.id
    database.serialize(() => {
        const select = 'SELECT username, password FROM User where id = ?'
        database.all(select, [id], (err, row) => {
            if (err) {
                response.status(400).send({ Erro: err })
            }
            else if (row.length > 0) {
                response.status(200).send({ Resultado: row })
            }
            else {
                response.status(404).send('Usuário não existe')
            }

        })
    })
})

module.exports = (api) => api.use('/api/User', router)
