const UserModel = require('../../model');

module.exports.createUserNote = function createUserNote(data) {
  const { email, password, username, mobile } = data;
  const user = new UserModel({
    email,
    password,
    username,
    mobile,
  });

  return user.save((err, item) => {
    console.log('saved:', item);
    return item;
  });
};
