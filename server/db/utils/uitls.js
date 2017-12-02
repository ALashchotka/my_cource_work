const { UserModel, ClothingModel } = require('../../model');

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
  const { id, name, price, filter, topic, images, sizes } = data;
  const clothing = new ClothingModel({
    id,
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
