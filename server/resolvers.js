const { createUserNote, createClothingNote } = require('./db/utils/uitls');

const resolveFunctions = {
  Mutation: {
    checkUser: async function checkUser(_, { email, password }, ctx) {
      let userData;
      const user = new ctx.constructor.User();
      await user.findUser(email, password)
        .then((data) => {
          userData = data;
        })
        .catch(e => console.log(e));
      if (userData) {
        console.log(`${userData.email} connected`);
        return {
          token: `${userData.username}_${userData.username.length}`,
          message: 'Log in success',
          username: `${userData.username}`,
          isAdmin: userData.isAdmin,
          favourites: userData.favourites,
          basket: userData.basket,
        };
      }
      return { message: 'Log in failed' };
    },
    addUser: function addUser(root, data, ctx) {
      console.log(ctx);
      createUserNote(data);
      const { email, password, username, mobile, isAdmin, favourites, basket } = data;
      return { email, password, username, mobile, isAdmin, favourites, basket };
    },
    checkClothing: async function checkClothing(_, { id }, ctx) {
      let clothingData;
      const clothing = new ctx.constructor.Clothing();
      await clothing.findClothingById(id)
        .then((data) => {
          clothingData = data;
        });
      if (clothingData) {
        console.log(clothingData);
        return clothingData;
      }
      return { message: 'Getting clothing failed' };
    },
    addClothing: function addClothing(root, data, ctx) {
      console.log(ctx);
      createClothingNote(data);
      const { name, price, filter, topic, images, sizes } = data;
      return { name, price, filter, topic, images, sizes };
    },
    getClothings: async function getClothings(_, $, ctx) {
      let clothingData;
      const clothing = new ctx.constructor.Clothing();
      await clothing.findClothings()
        .then((data) => { clothingData = data; });
      if (clothingData) {
        return clothingData;
      }
      return { message: 'Getting clothing failed' };
    },
    removeClothing: async function removeClothing(_, { id }, ctx) {
      const clothing = new ctx.constructor.Clothing();
      await clothing.removeClothing(id)
        .then(data => console.log(data));
      return id;
    },
    updateFavourites: async function updateFavourties(_, { email, id }, ctx) {
      const user = new ctx.constructor.User();
      await user.updateFavourties(email, id);
      return id;
    },
    updateBasket: async function updateBasket(_, { email, id }, ctx) {
      const user = new ctx.constructor.User();
      await user.updateBasket(email, id);
      return id;
    },
  },
};

module.exports = resolveFunctions;
