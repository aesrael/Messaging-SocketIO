var express = require("express");
var router = express.Router();
var passportConfig = require("../config/passport");
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");

// //custom modules
// var User = require("../models/user");

// //signup
// router.get("/register", function(req, res) {
//   res.render("register");
// });

// //get login
// router.get("/login", function(req, res) {
//   res.render("login");
// });

// //post signup information
// router.post("/register", function(req, res) {
//   var { username, password } = req.body;
//   //req.body validation
//   req.checkBody("username", "name is required").notEmpty();
//   req.checkBody("password", "password is required").notEmpty();

//   var errors = req.validationErrors();

//   if (errors) {
//     res.render("register", { errors: errors });
//   } else {
//     User.findOne({
//         email: req.body.email
//       },
//       (err, existingUser) => {
//         if (err) {
//           console.error(err);
//         }
//         if (existingUser) {
//           return res.redirect("/register");
//         }
//         newUser.save(err => {
//           if (err) {
//             return next(err);
//           }
//           res.redirect("/login");
//         });
//       }
//     );
//   }
// });
// passportConfig.passport();

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/api/login",
//     failureFlash: true
//   }),
//   function(req, res) {
//     res.redirect("/");
//   }
// );

// //logout

// router.get("/logout", function(req, res) {
//   req.logout();

//   req.flash("success_msg", "You are logged out");

//   res.redirect("/api/login");
// });
module.exports = router;
