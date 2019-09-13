const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

let database = new sqlite3.Database('database/Rpg.db')
/*
var datas = [
    { name: 'Guilherme', password: md5(1234) },
    { name: 'Wesley', password: md5(1234) },
    { name: 'Felipe', password: md5(1234) }];
*/
database.serialize(() => {
    database.run(`CREATE TABLE if not exists Usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);
/*   let insert = (`INSERT INTO Usuario (username, password) VALUES (?, ?)`)

    for(let data of datas) {
        database.run(insert, [data.name, data.password])    
    }

   
    database.each(`SELECT * FROM Usuario`, (err, row) => {
       
            console.log(row)
    }); 
    
  */  
  
    database.close()
});


  module.exports = new sqlite3.Database('database/Rpg.db')
    
