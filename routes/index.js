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
               db.any(`SELECT * FROM users INNER JOIN group_users ON group_users.user_id = users.id WHERE group_users.group_id = $1`, [req.params.id])])
        .then((group, users) => {
            res.render('groups', { title: 'Groups', group: group, users: users });
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
