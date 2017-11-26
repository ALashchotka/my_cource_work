const UserModel = require('../../model');

module.exports.createNote = function createNote(data) {
  const user = new UserModel({
    email: data.email,
    password: data.password,
  });

  return user.save((err, item) => {
    console.log('saved:', item);
    return item;
  });
};