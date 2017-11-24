var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('index')
});

router.get('/api/users', function (req, res) {
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

router.post('/register', function (req, res) {
  console.log(req.body);
  //res.send({json:'post'});
  var newUser = new User({name: req.body.name, username: req.body.username, password: req.body.password});

  User.createUser(newUser, function (err, user) {
    if (err) 
      throw err;
    console.log(user);
  });
  res.send('done!, user created :)');
});

router.put('/update/:id', function (req, res) {
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

module.exports = router;
