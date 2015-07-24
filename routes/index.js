var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var bucket = db.get('buckets');
var users = db.get('users');
var cookieSession = require('cookie-session');
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
