const express = require('express');
const router = express.Router();

<<<<<<< HEAD
=======
const database = require('../database/bancoDeDados.js');

router.get('./', (request, response) => {
    if (request.body.nome && request.body.email && request.body.senha) {
        let select = sqlite.run(`SELECT nome from Usuario where nome = Upper(${request.body.nome})`);
        response.status(200).send(select);

    }
    else
        response.status(404).send();
})
>>>>>>> f5cbb7f6510cfc4e6b5bcd99e85f59143ba17809
