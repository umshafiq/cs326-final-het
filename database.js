const pgPromise = require('pg-promise');

const initOptions = {
    query(e) {
        console.log('query', e.query);
    }
};

let pgp = pgPromise(initOptions);
let db = pgp({
    connectionString: process.env.DATABASE_URL,
    max: 30,
    ssl: {rejectUnauthorized: false}});

module.exports = db;
