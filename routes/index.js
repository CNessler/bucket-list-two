var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var buckets = db.get('buckets');
var users = db.get('users');
var bcrypt = require('bcryptjs');
var validate = require('../public/javascripts/validate.js')
var cookieSession = require('cookie-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
  var userName = req.body.user;
  var errorCheck = validate.signup(req.body.user, req.body.pass, req.body.passCheck);
  if (errorCheck.length > 0 || users.find({username: userName})){
    res.render('index', {errors: errorCheck, entry: 'Username already exists'})
  } else {
    var crypted = bcrypt.hashSync(req.body.pass, 8)
    users.insert({username: req.body.user, password: crypted})
    req.session.user = userName;
    res.redirect('/bucket/home')
  }
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.post('/login', function (req, res, next) {
  var errorCheck = validate.login(req.body.user, req.body.pass, req.body.pass);
  if (errorCheck.length > 0){
    res.render('login', {errors: errorCheck})
  } else {
    var userName = req.body.user
    users.findOne({username: req.body.user}, function (err, login) {
      if(bcrypt.compareSync(req.body.pass, login.password)){
        req.session.user = userName;
        res.redirect('/bucket/home')
      } else {
        res.render('login', {error: 'invalid entry'})
      }
    })
  }
})

router.get('/bucket/home', function (req, res, next) {
  if(req.session.user){
    console.log(req.session.user);
  buckets.find({userId: req.session.user}, function (err, items) {
  res.render('bucket/home', {items: items})
  })
  } else {
    res.redirect('/')
  }
})

router.get('/bucket/new', function (req, res, next) {
  if(req.session.user){
  res.render('bucket/new')
  } else {
    res.redirect('/')
  }
})

router.post('/bucket/new', function (req, res, next) {
  buckets.insert({title: req.body.title, location: req.body.location, description: req.body.description, cost: req.body.cost, difficulty: req.body.diff, people: req.body.checkbox, userId: req.session.user})
  res.redirect('/bucket/home')
})

router.get('/bucket/edit', function (req, res, next) {
  if(req.session.user){
  buckets.find({userId: req.session.user}, function (err, items) {
  res.render('bucket/edit', {items: items})
  })
  } else {
    res.redirect('/')
  }
})
router.get('/bucket/:id/editOne', function (req, res, next) {
  buckets.findOne({_id: req.params.id}, function (err, item) {
    res.render('bucket/editOne', {item: item})
  })
})

router.post('/bucket/:id', function (req, res, next) {
  buckets.update({_id: req.params.id}, {title: req.body.title, location: req.body.location, description: req.body.description, cost: req.body.cost, difficulty: req.body.diff, people: req.body.checkbox, userId: req.session.user})
  res.redirect('/bucket/home')
})

router.get('/bucket/:id', function (req, res, next) {
  buckets.findOne({_id: req.params.id}, function (err, item) {
    res.render('bucket/show', {item: item})
  })
})

router.post('/bucket/:id/delete', function (req, res, next) {
  buckets.remove({_id: req.params.id})
  res.redirect('/bucket/home')
})

router.post('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/')
})
module.exports = router;
