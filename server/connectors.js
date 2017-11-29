const UserModel = require('./model');

class User {
  constructor() {
    this.findUser = (email, password, name, mobile) => {
      const user = UserModel.findOne({ email, password, name, mobile }).exec();
      return user;
    };
  }
}

module.exports = { User };
