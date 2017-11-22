var mongoose = require('mongoose');

var ChatSchema= mongoose.Schema({
    owner:String,
    time:Date.now(),
    
})