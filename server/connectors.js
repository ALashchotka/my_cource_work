const { UserModel, ClothingModel } = require('./model');
const { find, without } = require('lodash');

class User {
  constructor() {
    this.findUser = (email, password) => {
      const user = UserModel.findOne({ email, password }).exec();
      return user;
    };
    this.updateFavourites = (email, _id) => {
      const user = UserModel.findOne({ email }).exec();
      if (find(user.favourites, _id)) {
        user.favourites = without(user.favourites, _id);
      } else {
        user.favourites.push(_id);
      }
      user.save();
      return user;
    };
    this.updateBasket = (email, _id) => {
      const user = UserModel.findOne({ email }).exec();
      if (find(user.basket, _id)) {
        user.basket = without(user.basket, _id);
      } else {
        user.basket.push(_id);
      }
      user.save();
      return user;
    };
  }
}

class Clothing {
  constructor() {
    this.findClothingById = (_id) => {
      const clothing = ClothingModel.findOne({ _id }).exec();
      return clothing;
    };
    this.findClothings = () => {
      const clothing = ClothingModel.find().exec();
      return clothing;
    };
    this.removeClothing = (_id) => {
      console.log(_id);
      const clothing = ClothingModel.findOneAndRemove({ _id }).exec();
      return clothing;
    };
  }
}

module.exports = { User, Clothing };
