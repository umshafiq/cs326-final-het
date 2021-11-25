const db = require('database');

let auth = (req, res, next) => {
    let user_id = req.cookies.id;
    db.one(`SELECT * FROM users WHERE id = $1`, [user_id])
        .then(() => {
            next();
        })
        .catch(err => {
            next(err);
        });
};

module.exports = { auth };
