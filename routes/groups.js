var express = require('express');
var router = express.Router();
const db = require('../database');

// CRUD API for group management
// Route        HTTP Verb  Description
// /            GET        Get all the groups
// /            POST       Create a group
// /:group_id   GET        Get a single group
// /:group_id   PUT        Update a group with new info.
// /:group_id   DELETE     Delete a group.

/* Groups index listing. */
router.get('/', function(req, res, next) {
    let sql = `SELECT * FROM groups`;
    db.any(sql)
        .then(() => {
            res.json({
                "message": "success",
                "data": rows
            });
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
    });
});

/* Create a new group */
router.post('/', function(req, res, next) {
    let sql = `INSERT INTO groups (name, price_limit, deadline_at) VALUES ($1, $2, $3)`;
    let params = [req.body.name, req.body.price_limit, req.body.deadline_at];
    db.none(sql, params)
        .then(() => {
            res.json({
                "message": "success",
                "id": this.lastID
            });
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
    });
});

/* Get a single group by id */
router.get('/:id', function(req, res, next) {
    let sql = `SELECT * FROM groups WHERE id = ?`;
    let params = [req.params.id];
    db.one(sql, params)
        .then((data) => {
            res.json({
                "message": "success",
                "data": data
            });
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
    });
});

/* Update a group */
router.put('/:id', function(req, res, next) {
    let sql = `UPDATE groups SET name = $1, price_limit = $2, deadline_at = $3 WHERE id = $4`;
    let params = [req.body.name, req.body.price_limit, req.body.deadline_at, req.params.id];
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
});

/* Delete a group */
router.delete('/:id', function(req, res, next) {
    let sql = `DELETE FROM groups WHERE id = $1`;
    let params = [req.params.id];
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
});


module.exports = router;
