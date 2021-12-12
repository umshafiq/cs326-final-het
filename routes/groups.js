var express = require('express');
var router = express.Router();
const db = require('../database');
const auth = require('../auth');

// CRUD API for group management
// Route        HTTP Verb  Description
// /            GET        Get all the groups
// /            POST       Create a group
// /:group_id   GET        Get a single group
// /:group_id   PUT        Update a group with new info.
// /:group_id   DELETE     Delete a group.

/* Get a single group by id */
router.get('/:id', function(req, res, next) {
    let sql = `SELECT * FROM groups WHERE id = $1`;
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

/* Create a new group */
router.post('/', auth.isLoggedIn, function(req, res, next) {
    let sql = `INSERT INTO groups (group_name, price_limit, deadline_at) VALUES ($1, $2, $3) RETURNING id`;
    let params = [req.body.group_name, req.body.price_limit, req.body.deadline_at];
    db.one(sql, params)
        .then((data) => {
            let sql = `INSERT INTO group_users (group_id, user_id, is_admin) VALUES ($1, $2, TRUE)`;
            let params = [data.id, req.user.id];
            db.none(sql, params)
                .then(() => {
                    res.redirect('/groups/'.concat(data.id.toString()).concat('/edit'));
                });
        })
        .catch(err => {
            res.status(400).json({"error": err.message});
            console.error(err);
        });
});


/* Update a group */
router.put('/:id', function(req, res, next) {
    let sql = `UPDATE groups SET group_name = $1, price_limit = $2, deadline_at = $3 WHERE id = $4`;
    let params = [req.body.group_name, req.body.price_limit, req.body.deadline_at, req.params.id];
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


/* assign group members */
router.post('/:id/assign', auth.isLoggedIn, function(req, res, next) {
  db.any(`SELECT * FROM users INNER JOIN group_users ON group_users.user_id = users.id WHERE group_users.group_id = $1`, [req.params.id])
      .then((users) => {
          let user_is_admin = false;
          let group_unassigned = true;
          for (user of users) {
              if (user.id === req.user.id && user.is_admin) {
                  user_is_admin = user.is_admin;
              }
              if (user.giftee_id !== null) {
                  group_unassigned = false;
              }
          }
          if (!user_is_admin) {
              res.status(400).render('error');
              return;
          }
          if (!group_unassigned) {
              res.status(400).render('error');
              return;
          }
          // if we made it this far, it's time to do the shuffle
          // amazingly, this can be done in one line of SQL
          db.none(`UPDATE group_users SET giftee_id = subtable1.coalesce FROM (SELECT user_id, COALESCE(lead(user_id) OVER (ORDER BY r), first_value(user_id) OVER (ORDER BY r)) FROM (SELECT random() as r, user_id FROM group_users WHERE group_id = $1) AS subtable) AS subtable1 WHERE group_users.group_id = $1 and group_users.user_id = subtable1.user_id`, [req.params.id])
              .then(() => {
                  res.redirect('/group/' + req.params.id.toString());
              })
              .catch(err => {
                  res.render('error');
              });
      })
      .catch(err => {
          res.render('error');
      });
});


module.exports = router;
