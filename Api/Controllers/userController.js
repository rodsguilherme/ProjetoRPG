const express = require('express');
const router = express.Router();

const md5 = require('md5');

// Importa o banco de dados
const database = require("../database/ConnectDB")

// Insere os usuarios

router.post('/insertUser', (request, response) => {
    let username = request.body.username
    let password = request.body.password

    if (!username && !password) {
        response.status(400).send('Preencha os campos corretamente!')
    }
    else {
        database.serialize(() => {
            database.all('SELECT username from Usuario where username = ?', [username], (erro, row) => {
                if (row.length > 0)
                    response.status(404).send({ Erro: 'Usuário já existe!' })
                else {
                    let insert = 'INSERT INTO Usuario (username, password) VALUES (?,?)'

                    database.run(insert, [username, md5("password")], (err, row) => {
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
    let id = request.params.id
    let username = request.body.username
    if (username) {
        database.serialize(() => {
            database.all('SELECT id FROM Usuario where id = ?', [id], (err, rows) => {
                if (rows.length === 0) {
                    response.status(404).send('Usuário não existe!')
                }
                else
                    database.all('SELECT username FROM Usuario where username = ?', [username], (err, row) => {
                        if (row.length > 0) {
                            response.status(404).send('Nome de usuáirio já cadastrado!')
                        }
                        else {
                            database.run('UPDATE Usuario set username = ? where id = ?', [username, id], (err) => {
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

// DELETA USUARIO POR ID
router.delete('/:id', (request, response) => {
    let id = request.params.id
    database.serialize(() => {
        let deleteSql = 'DELETE FROM Usuario WHERE id = ?'
        database.run(deleteSql, [id], (err) => {
            if (err) {
                response.status(400).send({ Erro: err })
            }
            else {
                response.status(200).send('Usuario deletado com sucesso!')
            }
        })
    })
})



// Retorna todos os usuarios cadastrados
router.get('/getUsers', (request, response) => {
    database.serialize(() => {
        let select = 'SELECT id, username, password FROM Usuario'
        database.all(select, (err, row) => {
            if (!err)
                response.status(200).send({ Row: row })
            else
                response.status(404).send({ Erro: err.message })

        })
    })
})

router.get('/:id', (request, response) => {
    let id = request.params.id
    database.serialize(() => {
        let select = 'SELECT username FROM Usuario where id = ?'
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
