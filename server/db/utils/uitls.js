const UserModel = require('../../model');

module.exports.createNote = function createNote(data) {
  const { email, password, name, mobile } = data;
  const user = new UserModel({
    email,
    password,
    name,
    mobile,
  });

  return user.save((err, item) => {
    console.log('saved:', item);
    return item;
  });
};
