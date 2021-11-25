import pgPromise from 'pg-promise';

let pgp = pgPromise({});
let db = pgp({
    connectionString: process.env.DATABASE_URL,
    max: 30,
    ssl: {rejectUnauthorized: false}});

module.exports = db;
