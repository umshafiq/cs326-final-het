var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/groups', function(req, res, next) {
  res.render('groups', { title: 'Groups' });
});

router.get('/giftee', function(req, res, next) {
  res.render('giftee', { title: 'Giftee' });
});

module.exports = router;
