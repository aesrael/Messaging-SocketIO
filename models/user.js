var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    newUser.save(newUser, callback);
}
module.exports.findUserByUsername = function (username, callback) {
    var query = {
        username: username
    };
    User.findOne(query, callback);
}
module.exports.findUserById = function (id, callback) {
    User.findById(id, callback);
}
module.exports.updateUser = function (id, source, callback) {
    User.findByIdAndUpdate(id, source, callback);
}
module.exports.deleteUser = function (id, callback) {
    User.findByIdAndRemove(id, callback);
}
