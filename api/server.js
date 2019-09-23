const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt')


const jwtMidlleWare = exjwt({
  secret : 'supersecretpass'
});


const api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());



// =============== Importação dos controllers ====================

require('./controllers/userController')(api);


// ===============================================================


const porta = 3000;
api.listen(porta, ()  => {
  console.log(`Rodando na porta ${porta}!`);
});


