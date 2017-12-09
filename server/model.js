const Mongoose = require('mongoose');

const ClothingSchema = Mongoose.Schema({
  name: String,
  price: Number,
  filter: String,
  topic: String,
  images: [String],
  sizes: [Number],
});

const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
  username: String,
  mobile: String,
  isAdmin: Boolean,
  favourites: [String],
  basket: [String],
});

const UserModel = Mongoose.model('User', UserSchema);
const ClothingModel = Mongoose.model('Clothing', ClothingSchema);

module.exports = { UserModel, ClothingModel };
