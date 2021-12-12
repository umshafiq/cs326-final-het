const express = require('express');
const router = express.Router();
const moment = require('moment');
const auth = require('../auth');
const db = require('../database');

router.get('/', function(req, res, next) {
  if (req.user) {
    return res.redirect('/profile');
  }
  res.render('index', { title: 'Login', user: null });
});

router.get('/signup', function(req, res, next) {
  if (req.user) {
    return res.redirect('/profile');
  }
  res.render('signup', { title: 'Signup', user: null });
});

router.get('/profile', auth.isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user });
});

router.get('/create_group', auth.isLoggedIn, function(req, res, next) {
  res.render('create_group', { title: 'Create a New Group', user: req.user });
});

router.get('/groups/:id/edit', auth.isLoggedIn, function(req, res, next) {
        console.log(moment);
  db.one(`SELECT * FROM groups WHERE id = $1`, [req.params.id])
  .then((data) => {
      res.render('edit_group', { title: 'Edit Group', group: data, user: req.user, moment: moment });
  })
  .catch(err => {
      res.render('error');
  });
});


router.get('/group', auth.isLoggedIn, function(req, res, next) {
  db.manyOrNone(`SELECT groups.* AS count FROM groups LEFT JOIN group_users ON groups.id = group_users.group_id WHERE group_users.user_id = $1`, [req.user.id])
  .then((groups) => {
      res.render('group_list', { title: 'Group List', groups: groups, user: req.user, moment: moment });
  });
});

router.get('/group/:id', auth.isLoggedIn, function(req, res, next) {
  Promise.all([db.one(`SELECT * FROM groups WHERE id = $1`, [req.params.id]),
               db.any(`SELECT group_users.is_admin as is_admin, users.id as id, users.name as name, group_users.giftee_id as giftee_id, giftee.name as giftee_name, giftee.email as giftee_email, giftee.address as giftee_address, group_users.item_id as item_id FROM group_users INNER JOIN users ON group_users.user_id = users.id LEFT JOIN users as giftee ON group_users.giftee_id = giftee.id WHERE group_users.group_id = $1`, [req.params.id])])
        .then((data) => {
            const group = data[0];
            const users = data[1];
            let giftee = null;
            let is_admin = false;
            let purchased = false;
            let gift_sent = false;
            for (user of users) {
                if (user.id === req.user.id) {
                    if (user.is_admin) {
                       is_admin = true;
                    }
                    if (user.giftee_name && user.giftee_email) {
                        giftee = {name: user.giftee_name, email: user.giftee_email};
                    }
                    if (user.item_id) {
                        purchased = true;
                    }
                }
                if (user.giftee_id === req.user.id) {
                    if (user.item_id) {
                        gift_sent = true;
                    }
                }
            }
            res.render('groups', { title: 'Groups', group: group, users: users, giftee: giftee, user: req.user, is_admin: is_admin, purchased: purchased, gift_sent: gift_sent, moment: moment });
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
                    res.render('items', { title: 'Item Suggestions', group: group, items: items, user: req.user, moment: moment });
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
                      [req.params.id, req.user.id])])
  .then((data) => {
    const items = data[0];
    const group_assignment = data[1];
    if (group_assignment.giftee_id === null) {
        res.status(400).render('Santa Assignments have not yet been made!');
    }
    db.one(`SELECT * FROM users WHERE id = $1`, [group_assignment.giftee_id])
    .then((giftee) => {
       res.render('gifter', { title: 'Gifter', group_id: req.params.id, items: items, giftee: giftee, user: req.user, group_assignment: group_assignment });
    });
  });
});

router.get('/group/:id/giftee', auth.isLoggedIn, function(req, res, next) {
  db.one(`SELECT * FROM group_users WHERE group_id = $1 AND giftee_id = $2`,
         [req.params.id, req.user.id])
  .then((group_info) => {
    if (group_info.item_id === null) {
        res.status(400).render('Santa hasn\'t sent you your gift yet!');
    } else {
      db.one(`SELECT * FROM items WHERE id = $1`, [group_info.item_id])
      .then((item) => {
        res.render('giftee', { title: 'Giftee', group_info: group_info, item: item, user: req.user });
      });
    }
  });
});

router.get('/group/:id/add', auth.isLoggedIn, function(req, res, next) {
  Promise.all([db.one(`SELECT * FROM groups WHERE id = $1`, [req.params.id]),
               db.manyOrNone(`SELECT users.* FROM users LEFT JOIN group_users ON users.id = group_users.user_id WHERE group_users.group_id != $1`, [req.params.id])])
  .then((data) => {
          const group = data[0];
          const addableUsers = data[1];
     res.render('add_user', { title: 'Add User', group: group, addableUsers: addableUsers, user: req.user });
  });
});


router.get('/group/:id/withdraw', auth.isLoggedIn, function(req, res, next) {
  db.one(`SELECT * FROM groups WHERE id = $1`,
         [req.params.id, user.id])
  .then((group) => {
     res.render('withdraw', { title: 'Withdraw', group: group, user: req.user });
  });
});

router.get('/login/:id', auth.login);

router.get('/logout', auth.logout);

module.exports = router;
