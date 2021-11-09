var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(
            './database/db.sqlite',
            sqlite3.OPEN_READWRITE,
            (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Connected to the database.');
                }
            }
);

module.exports = db;
