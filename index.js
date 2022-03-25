/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const clc = require('cli-color');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');

require('dotenv').config({ path: '.env' });

const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  serverApollo.listen().then(({ url }) => {
    console.log(clc.green(`Connection success!, server on at ${url} 🔥 🚀'`));
  });
};

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err, _res) => {
  if (err) {
    return console.log('Error de conexion', err);
  }

  return server();
});
