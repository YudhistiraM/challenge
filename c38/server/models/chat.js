var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chat = new Schema({
  name: String,
  message: String
})

module.exports = mongoose.model('Chat', chat)
