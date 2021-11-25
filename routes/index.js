var express = require('express');
var router = express.Router();

const auth = require('../auth').auth;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/profile', auth, function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/group', function(req, res, next) {
  res.render('groups', { title: 'Groups' });
});

router.get('/giftee', function(req, res, next) {
  res.render('giftee', { title: 'Giftee' });
});

module.exports = router;
