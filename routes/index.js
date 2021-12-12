var express = require('express');
var router = express.Router();

const auth = require('../auth');
const db = require('../database');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/profile', auth.isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user });
});

router.get('/create_group', auth.isLoggedIn, function(req, res, next) {
  res.render('create_group', { title: 'Create a New Group' });
});

router.get('/groups/:id/edit', auth.isLoggedIn, function(req, res, next) {
  db.one(`SELECT * FROM groups WHERE id = $1`, [req.params.id])
  .then((data) => {
      res.render('edit_group', { title: 'Edit Group', group: data });
  })
  .catch(err => {
      res.render('error');
  });
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

router.get('/group/:id/gifter', auth.isLoggedIn, function(req, res, next) {
  Promise.all([db.manyOrNone(`SELECT * FROM items`),
               db.one(`SELECT * FROM group_users WHERE group_id = $1 AND user_id = $2`,
                      [req.params.id, user.id])])
  .then((data) => {
    const items = data[0];
    const group_assignment = data[1];
    if (group_assignment.giftee_id === null) {
        res.status(400).render('Santa Assignments have not yet been made!');
    }
    db.one(`SELECT * FROM users WHERE user_id = $1`, [group_assignment.giftee_id])
    .then((giftee) => {
       res.render('gifter', { title: 'Gifter', items: items, giftee: giftee });
    });
  });
});

router.get('/group/:id/giftee', auth.isLoggedIn, function(req, res, next) {
  db.one(`SELECT * FROM group_users WHERE group_id = $1 AND user_id = $2`,
         [req.params.id, user.id])
  .then((group_info) => {
    if (group_info.item_id === null) {
        res.status(400).render('Santa hasn\'t sent you your gift yet!');
    } else {
      db.one(`SELECT * FROM items WHERE item_id = $2`, [group_info.item_id])
      .then((item) => {
        res.render('giftee', { title: 'Giftee', group_info: group_info, item: item });
      });
    }
  });
});

router.get('/group/:id/withdraw', auth.isLoggedIn, function(req, res, next) {
  db.one(`SELECT * FROM groups WHERE id = $1`,
         [req.params.id, user.id])
  .then((group) => {
     res.render('withdraw', { title: 'Withdraw', group: group });
  });
});

router.get('/login/:id', auth.login);

router.get('/logout', auth.logout);

module.exports = router;
