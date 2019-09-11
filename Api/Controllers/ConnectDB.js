const sqlite3 = require('sqlite3').verbose();



function connectDB() {
    let database = new sqlite3.Database('./db/databaseRpg.sql', (error) => {
        if (error) {
            return console.error(error.message);
        }
        console.log('Connected!');
    });
    database.close((error) => {
        if (error) {
            return console.error(error.message);
        }
        console.log('Close sucess');
    });
}

module.exports =  connectDB();