const { UserModel, ClothingModel } = require('./model');

class User {
  constructor() {
    this.findUser = (email, password) => {
      const user = UserModel.findOne({ email, password }).exec();
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
  }
}

module.exports = { User, Clothing };
