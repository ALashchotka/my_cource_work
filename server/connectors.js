const UserModel = require('./model');

class User {
  constructor() {
    this.findUser = (email, password) => {
      const user = UserModel.findOne({ email, password }).exec();
      return user;
    };
  }
}

module.exports = { User };
