const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
});

const User = Mongoose.model('User', UserSchema);

module.exports = User;
