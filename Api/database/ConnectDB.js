const express = require('express')
const router = express.Router()

const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

let database = new sqlite3.Database('database/Rpg.db')

database.serialize(() => {
    database.run(`CREATE TABLE if not exists Usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);
    
    database.close()
});


  module.exports = new sqlite3.Database('database/Rpg.db')
    
