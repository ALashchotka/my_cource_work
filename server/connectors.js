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
    this.findClothing = (id) => {
      const clothing = ClothingModel.findOne({ id }).exec();
      return clothing;
    };
  }
}

module.exports = { User, Clothing };
