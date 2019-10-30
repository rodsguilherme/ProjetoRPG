/*

const sqlite3 = require('sqlite3-promisify')
const dir = path.resolve(__dirname, 'rpg.db')
const database =  new sqlite3(dir);
*/
const path = require('path')
const dir = path.resolve(__dirname, 'rpg.db')
const database = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dir
    },
    useNullAsDefault: true
    
    
})
module.exports = database