var express = require('express');
var router = express.Router();

const auth = require('../auth');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/profile', auth.isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/group', auth.isLoggedIn, function(req, res, next) {
  res.render('groups', { title: 'Groups' });
});

router.get('/giftee', auth.isLoggedIn, function(req, res, next) {
  res.render('giftee', { title: 'Giftee' });
});

router.get('/login/:id', auth.login);

router.get('/logout', auth.logout);

module.exports = router;
