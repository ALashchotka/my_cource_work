const { UserModel, ClothingModel } = require('../../model');
const { uniqueId } = require('lodash');

function createUserNote(data) {
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
}

function createClothingNote(data) {
  const { name, price, filter, topic, images, sizes } = data;
  const clothing = new ClothingModel({
    id: uniqueId(),
    name,
    price,
    filter,
    topic,
    images,
    sizes,
  });

  return clothing.save((err, item) => {
    console.log('saved:', item);
    return item;
  });
}

module.exports = { createUserNote, createClothingNote };
