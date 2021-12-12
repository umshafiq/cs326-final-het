const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../auth');

/* Create a new user */
router.post('/', function(req, res, next) {
    let sql = `INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING id`;
    let params = [req.body.name, req.body.email, req.body.address];
    db.one(sql, params)
        .then((data) => {
            req.params.id = data.id;
            auth.login(req, res);
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
});

/* Update a user's information */
router.put('/:id', auth.isLoggedIn, function(req, res, next) {
    if (req.user.id.toString() !== req.params.id) {
        res.status(403).json({"error": "permission denied"});
        return;
    }
    let sql = `UPDATE users SET name = $1, email = $2, address = $3 WHERE id = $4`;
    let params = [req.body.name, req.body.email, req.body.address, req.user.id];
    db.none(sql, params)
        .then(() => {
            res.json({
                "message": "success"
            });
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
});


module.exports = router;
