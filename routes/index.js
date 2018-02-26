var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStategy = require('passport-local').Strategy;
var passportConfig = require('../config/passport')

var User = require('../models/user');

router.get("/",isAuthenticated, function(req, res) {
  res.render("index");
});
//signup
router.get("/register", function(req, res) {
  res.render("register");
});

//get login
router.get("/login", function(req, res) {
  res.render("login");
});

//post signup information
router.post("/register", function(req, res) {
  var { username, password } = req.body;
  //req.body validation
  req.checkBody("username", "name is required").notEmpty();
  req.checkBody("password", "password is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render("register", { errors: errors });
  } else {
    var newUser= new User({
      username, password
    })
    User.findOne(
      {
        username: req.body.username
      },
      (err, existingUser) => {
        if (err) {
          console.error(err);
        }
        if (existingUser) {
          return res.redirect("/register");
        }
        newUser.save(err => {
          if (err) {
            return next(err);
          }
          res.redirect("/login");
        });
      }
    );
  }
});
passportConfig.passport();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {
    res.redirect("/");
  }
);

//logout

router.get("/logout", function(req, res) {
  req.logout();

  req.flash("success_msg", "You are logged out");

  res.redirect("/login");
});


function isAuthenticated(req, res, next) {
  if (req.user) {
    next()
  }
  res.redirect('/login')
}

module.exports = router;