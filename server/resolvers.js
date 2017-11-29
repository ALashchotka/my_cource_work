const { createNote } = require('./db/utils/uitls');

const resolveFunctions = {
  Mutation: {
    checkUser: async function checkUser(_, { email, password }, ctx) {
      console.log(ctx.token);
      let userData;
      const user = new ctx.constructor.User();
      await user.findUser(email, password)
        .then((data) => {
          userData = data;
        });
      if (userData) {
        return { token: `token-${email}`, message: 'Log in success' };
      }
      return { message: 'Log in failed' };
    },
    addUser: function addUser(root, data, ctx) {
      console.log(ctx);
      createNote(data);
      const { email, password, name, mobile } = data;
      return { email, password, name, mobile };
    },
  },
};

module.exports = resolveFunctions;
