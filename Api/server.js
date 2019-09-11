const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const database = require('./database/ConnectDB')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =============== Importação dos controllers ====================





// ===============================================================

app.get('/', function (req, res) {
  res.send('Projeto de RPG');
});

const porta = 3000;
app.listen(porta, ()  => {
  console.log(`Rodando na porta ${porta}!`);
})


