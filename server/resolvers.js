const { createUserNote, createClothingNote } = require('./db/utils/uitls');

const resolveFunctions = {
  Mutation: {
    checkUser: async function checkUser(_, { email, password }, ctx) {
      let userData;
      const user = new ctx.constructor.User();
      await user.findUser(email, password)
        .then((data) => {
          userData = data;
        });
      if (userData) {
        return {
          token: `${userData.username}_${userData.username.length}`,
          message: 'Log in success',
          username: `${userData.username}`,
        };
      }
      return { message: 'Log in failed' };
    },
    addUser: function addUser(root, data, ctx) {
      console.log(ctx);
      createUserNote(data);
      const { email, password, username, mobile } = data;
      return { email, password, username, mobile };
    },
    checkClothing: async function checkClothing(_, { id }, ctx) {
      let clothingData;
      const clothing = new ctx.constructor.Clothing();
      await clothing.findClothingById(id)
        .then((data) => {
          clothingData = data;
        });
      if (clothingData) {
        return {
          ...clothingData,
        };
      }
      return { message: 'Getting clothing failed' };
    },
    addClothing: function addClothing(root, data, ctx) {
      console.log(ctx);
      createClothingNote(data);
      const { id, name, price, filter, topic, images, sizes } = data;
      return { id, name, price, filter, topic, images, sizes };
    },
    getClothings: async function getClothings(_, $, ctx) {
      let clothingData;
      const clothing = new ctx.constructor.Clothing();
      await clothing.findClothings()
        .then((data) => {
          console.log(data);
          clothingData = data;
        });
      if (clothingData) {
        return clothingData;
      }
      return { message: 'Getting clothing failed' };
    },
  },
};

module.exports = resolveFunctions;
