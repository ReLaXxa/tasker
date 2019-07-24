var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, async(err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        await db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE,
            password text,
            CONSTRAINT username_unique UNIQUE (username)
            )`,
            (err) => {
                if (err) {
                    console.log('We already have table "users". Skipping...');
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO users (username, password) VALUES (?,?)'
                    db.run(insert, ["admin", md5("pass123")])
                    db.run(insert, ["user", md5("pass123")])
                    db.run(insert, ["user2", md5("pass123")])
                    db.run(insert, ["user3", md5("pass123")])
                   
                }
            });
        await db.run(`CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            body text,
            owner text,
            status text
            )`,
            (err) => {
                if (err) {
                    console.log('We already have table "tasks". Skipping...');
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO tasks (title,body,owner,status) VALUES (?,?,?,?)';
                    db.run(insert, ["Task #1",'Lorem ipsuim dores moros something...','1','1']);
                    db.run(insert, ["Task #3", 'Lorem ipsuim dores moros something...', '1', '0']);
                    db.run(insert, ["Task #4", 'Lorem ipsuim dores moros something...', '3', '1']);
                }
            });
       
    }
    

});

module.exports = db