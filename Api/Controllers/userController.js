const express = require('express');
const router = express.Router();

const md5 = require('md5');

// Importa o banco de dados
const database = require("../database/ConnectDB")


router.post('/insertUser', (request, response) => {
    let username = request.body.username
    let password = request.body.password

    if (!username && !password) {
        response.status(400).send('Preencha os campos corretamente!')
    }
    else {
        database.serialize(() => {
            database.all('SELECT username from Usuario where username = ?', [username], (erro, row) => {
                if (row.length >= 0)
                    response.status(404).send({ Erro: 'Usuário já existe!' })
                else {
                    let insert = 'INSERT INTO Usuario (username, password) VALUES (?,?)'

                    database.run(insert, [username, password], (err, row) => {
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
            database.all('SELECT id FROM Usuario where id = ?', [id], (erro, rows) => {
                if (rows.length === 0) {
                    response.status(404).send('Usuário não existe!')
                }
                else
                    database.all('SELECT username FROM Usuario where username = ?', [username], (error, row) => {
                        if (row.length > 0) {
                            response.status(404).send('Nome de usuáirio já cadastrado!')
                        }
                        else {
                            database.run('UPDATE Usuario set username = ? where id = ?', [username, id], (erro, row) => {
                                if (!erro) {
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




// Retorna todos os usuarios cadastrados
router.get('/getUser', (request, response) => {
    database.serialize(() => {
        database.all('SELECT username FROM Usuario', (err, row) => {
            if (!err)
                response.status(200).send({ Row: row })
            else
                response.status(400).send({ Erro: err.message })

        })
    })
})


module.exports = (api) => api.use('/api/User', router)
