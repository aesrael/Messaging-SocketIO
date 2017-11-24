var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStategy = require('passport-local').Strategy;
var passportConfig = require('../config/passport')

var User = require('../models/user');

/* GET users listing. */
router.get('/api', function (req, res) {
    User
        .find({}, function (err, users) {
            //res.send(users);
            res.render('index');
        })
});

router.get('/users', function (req, res) {
    User
        .find({}, function (err, users) {
            res.send(users);
            // res.render('index');
        })
});

//Get user by username
router.get('/:username', function (req, res) {
    User
        .findUserByUsername(req.params.username, function (err, user) {
            console.log(user);
            res.send(user);
        })
});
//get User by Id
/*router.get('/api/:id', function (req, res) {
  User.findUserById(req.params.id, function (err, user) {
    console.log(user);
    res.send(user);
  })
});*/

router.post('/signup', function (req, res) {
    console.log(req.body);
    //res.send({json:'post'});
    const {username, password} = req.body;

    const newUser = User({username, password});

    User.createUser(newUser, function (err, user) {
        if (err) 
            throw err;
        console.log(user);
    });
    res.send('done!, user created :)');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}), function (req, res) {
    res.redirect('/');
});

router.put('/api/update/:id', function (req, res) {
    User
        .updateUser(req.params.id, req.body, function (err, user) {
            if (err) {
                throw err
            };
            User.findUserById(req.params.id, function (err, user) {
                if (err) {
                    throw err
                };
                console.log(user);
                res.send(user);
            })
        })
});

router.delete('/api/:id', function (req, res) {
    User
        .deleteUser({
            _id: req.params.id
        }, function (err, user) {
            if (err) 
                throw err;
            console.log(user);
            res.send(user);
        })
})
//logout
router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
})

module.exports = router;
