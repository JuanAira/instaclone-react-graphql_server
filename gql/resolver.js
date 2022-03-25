const userController = require('../controller/user');

const resolvers = {
  Query: {
    getUser: () => {
      return null;
    },
  },
  Mutation: {
    // User
    register: async (_, { input }) => userController.register({ input }),
    login: (_, { input }) => userController.login({ input }),
  },
};

module.exports = resolvers;
