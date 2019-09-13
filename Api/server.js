const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// =============== Importação dos controllers ====================

require('./Controllers/UserController')(api);


// ===============================================================



const porta = 3000;
api.listen(porta, ()  => {
  console.log(`Rodando na porta ${porta}!`);
})


