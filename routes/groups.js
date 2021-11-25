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
    db.all(sql, function (err, rows) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

/* Create a new group */
router.post('/', function(req, res, next) {
    let sql = `INSERT INTO groups (name, price_limit, deadline_at) VALUES (?, ?, ?)`;
    let params = [req.body.name, req.body.price_limit, req.body.deadline_at];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "id": this.lastID
        });
    });
});

/* Get a single group by id */
router.get('/:id', function(req, res, next) {
    let sql = `SELECT * FROM groups WHERE id = ?`;
    let params = [req.params.id];
    db.get(sql, params, function (err, row) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!row) {
            res.status(404).json({"error": "group not found"});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

/* Update a group */
router.put('/:id', function(req, res, next) {
    let sql = `UPDATE groups SET name = ?, price_limit = ?, deadline_at = ? WHERE id = ?`;
    let params = [req.body.name, req.body.price_limit, req.body.deadline_at, req.params.id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success"
        });
    });
});

/* Delete a group */
router.delete('/:id', function(req, res, next) {
    let sql = `DELETE FROM groups WHERE id = ?`;
    let params = [req.params.id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success"
        });
    });
});


module.exports = router;
