const express = require('express');
const router = express.Router();

const database = require('../database/bancoDeDados.js');

router.get('./', (request, response) => {
    if (request.body.nome && request.body.email && request.body.senha) {
        let select = sqlite.run(`SELECT nome from Usuario where nome = Upper(${request.body.nome})`);
        response.status(200).send(select);

    }
    else
        response.status(404).send();
})