var sqlite = require('sqlite-sync')

//Conectando
sqlite.connect('Rpg.sql')

//Criando exemplo de tabela 
// sqlite.run('Create Table Comida(ID INTEGER PRIMARY KEY AUTOINCREMENT')

module.exports = sqlite