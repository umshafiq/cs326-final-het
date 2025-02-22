const db = require('./database');

let isLoggedIn = (req, res, next) => {
    let user_id = req.cookies.id;
    db.one(`SELECT * FROM users WHERE id = $1`, [user_id])
        .then((data) => {
            console.log(req.user);
            req.user = data;
            next();
        })
        .catch(err => {
            console.error(err);
            res.redirect('/');
        });
};

let login = (req, res) => {
    res.cookie('id', req.params.id);
    res.redirect('/profile');
};

let logout = (req, res) => {
    res.clearCookie('id');
    res.redirect('/');
};

module.exports = { isLoggedIn, login, logout };
