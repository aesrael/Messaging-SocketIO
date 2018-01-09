var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStategy = require('passport-local').Strategy;
var passportConfig = require('../config/passport')

var User = require('../models/user');

/* GET users listing. */
router.get('/', isAutenticated, function (req, res) {

  res.render('index',{user:req.user});
});
// router.get('/register', function (req, res) {
//   res.render('register');
// });
// router.get('/login', function (req, res) {
//   res.render('login');
// });

function isAutenticated(req, res, next) {
  if (req.user) {
    next()
  }
  res.redirect('/api/login')
}

module.exports = router;