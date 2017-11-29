const { createNote } = require('./db/utils/uitls');

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
      createNote(data);
      const { email, password, username, mobile } = data;
      return { email, password, username, mobile };
    },
  },
};

module.exports = resolveFunctions;
