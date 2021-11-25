var express = require('express');
var router = express.Router();

const auth = require('../auth');
const db = require('../database');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/profile', auth.isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user });
});

router.get('/group', auth.isLoggedIn, function(req, res, next) {
  res.render('groups', { title: 'Groups' });
});

router.get('/group/:id', auth.isLoggedIn, function(req, res, next) {
  Promise.all([db.one(`SELECT * FROM groups WHERE id = $1`, [req.params.id]),
               db.any(`SELECT group_users.is_admin, users.id, users.name, giftee.name as giftee_name, giftee.email as giftee_email FROM group_users INNER JOIN users ON group_users.user_id = users.id LEFT JOIN users as giftee ON group_users.giftee_id = giftee.id WHERE group_users.group_id = $1`, [req.params.id])])
        .then((data) => {
            group = data[0];
            users = data[1];
            giftee = null;
            for (user of users) {
                if (user.id === req.user.id) {
                    giftee = {name: user.giftee_name, email: user.giftee_email};
                }
            }
            res.render('groups', { title: 'Groups', group: group, users: users, giftee: giftee });
        })
        .catch(err => {
            res.render('error');
        });

});

router.get('/group/:id/items', auth.isLoggedIn, function(req, res, next) {
  db.one(`SELECT * FROM groups WHERE id = $1`, [req.params.id])
        .then((group) => {
            db.any(`SELECT * FROM items WHERE price < $1`, [group.price_limit])
                .then((items) => {
                    res.render('items', { title: 'Item Suggestions', group: group, items: items });
                })
                .catch(err => {
                    res.render('error');
                });
        })
        .catch(err => {
            res.render('error');
        });
});

router.get('/group/:id/assign', auth.isLoggedIn, function(req, res, next) {
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



router.get('/giftee', auth.isLoggedIn, function(req, res, next) {
  res.render('giftee', { title: 'Giftee' });
});

router.get('/login/:id', auth.login);

router.get('/logout', auth.logout);

module.exports = router;
