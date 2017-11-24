var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


module.exports.passport = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.getUserByUsername(username, function (err, user) {
                if (err) {
                    throw err
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }

                //else compare password
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) {
                        throw err
                    }

                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        })
                    }
                })
            })
        }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });
}

