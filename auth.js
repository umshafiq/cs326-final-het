const db = require('./database');

let isLoggedIn = (req, res, next) => {
    let user_id = req.cookies.id;
    db.one(`SELECT * FROM users WHERE id = $1`, [user_id])
        .then(() => {
            next();
        })
        .catch(err => {
            res.redirect('/');
        });
};

let logout = (req, res) => {
    res.clearCookie('id');
    res.redirect('/');
};

module.exports = { isLoggedIn, logout };
