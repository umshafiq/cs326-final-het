const express = require('express');
const router = express.Router();
const auth = require('../auth');

/* Create a new user */
router.post('/', function(req, res, next) {
    let sql = `INSERT INTO users (name, email, address) VALUES ($1, $2, $3)`;
    let params = [req.body.name, req.body.email, req.body.address];
    db.none(sql, params)
        .then(() => {
            req.params.id = this.lastID;
            auth.login(req, res);
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
});

/* Update a user's information */
router.put('/:id', isLoggedIn, function(req, res, next) {
    if (req.user.id !== req.params.id) {
        res.status(403).json({"error": "permission denied"});
        return;
    }
    let sql = `UPDATE users SET (name, email, address) VALUES ($1, $2, $3) WHERE id = $4`;
    let params = [req.body.name, req.body.email, req.body.address, req.params.id];
    db.none(sql, params)
        .then(() => {
            res.redirect('/profile');
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
});


module.exports = router;
