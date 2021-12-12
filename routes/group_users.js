const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../auth');

// CRUD API for group membership management
// Route                 HTTP Verb  Description
// /:group_id            GET        Get all the group_users 
// /:group_id/:user_id   POST       Add a user to a group
// /:group_id/:user_id   GET        Get information about a user's membership
// /:group_id/:user_id   PUT        Update a user's membership information.
// /:group_id/:user_id   DELETE     Remove a user from a group.

/* Group membership listing. */
router.get('/:group_id', function(req, res, next) {
    let sql = `SELECT users.* FROM group_users INNER JOIN users ON (group_users.user_id = users.id) WHERE group_users.group_id = $1`;
    let params = [req.params.group_id];
    db.any(sql, params)
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

/* Add a user to a group */
router.post('/:group_id/:user_id', auth.isLoggedIn, function(req, res, next) {
    let sql = `INSERT INTO group_users (group_id, user_id) VALUES ($1, $2)`;
    let params = [req.params.group_id, req.params.user_id];
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

/* Get information about a user's membership */
router.get('/:group_id/:user_id', function(req, res, next) {
    let sql = `SELECT * FROM group_users WHERE group_id = $1 AND user_id = $2`;
    let params = [req.params.group_id, req.params.user_id];
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

/* Update a membership */
router.put('/:group_id/:user_id', function(req, res, next) {
    let sql = `UPDATE group_users SET is_admin = $1, item_id = $2, rating = $3 WHERE group_id = $4 AND user_id = $5`;
    let params = [req.body.is_admin, req.body.item_id, req.body.rating, req.params.group_id, req.params.user_id];
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

/* Remove a user from a group */
// - check that an item has not been purchased for the user already
// - also check that the group would have at least 3 members after deletion
// - then reassign the gifter to the giftee
// - finally, delete
router.delete('/:group_id/:user_id', function(req, res, next) {
    let sql = `SELECT COUNT(*) FROM group_users WHERE group_id = $1 AND user_id != $2`;
    let params = [req.params.group_id, req.params.user_id];
    db.one(sql, params, c => +c.count)
    .then((count) => {
        if (count < 3) {
            res.status(400).json({"error": "leaving would leave too few members in the group"});
        }
        let sql = `SELECT * FROM group_users WHERE group_id = $1 AND giftee_id = $2`;
        let params = [req.params.group_id, req.params.user_id];
        db.oneOrNone(sql, params)
        .then((gifter) => {
            if (gifter === null) {
                // assignments haven't been made yet, safe to delete
                let sql = `DELETE FROM group_users WHERE group_id = $1 AND user_id = $2`;
                let params = [req.params.group_id, req.params.user_id];
                db.none(sql, params)
                .then(() => {
                    res.json({
                        "message": "success"
                    });
                });
            } else if (gifter.item_id !== null) {
                res.status(400).json({"error": "a gift has already been purchased for this user"});
            } else {
                // we need to reassign the current user's giftee to the the user's gifter
                let sql = `SELECT * FROM group_users WHERE group_id = $1 AND user_id = $2`;
                let params = [req.params.group_id, req.params.user_id];
                db.one(sql, params)
                .then((quitter) => {
                    let sql = `UPDATE group_users SET giftee_id = $1 WHERE id = $2`;
                    let params = [quitter.giftee_id, gifter.id];
                    db.none(sql, params)
                    .then(() => {
                        // finally safe to delete
                        let sql = `DELETE FROM group_users WHERE group_id = $1 AND user_id = $2`;
                        let params = [req.params.group_id, req.params.user_id];
                        db.none(sql, params)
                        .then(() => {
                            res.json({
                                "message": "success"
                            });
                        });
                    });
                });
            }
        });
    });
});


module.exports = router;
