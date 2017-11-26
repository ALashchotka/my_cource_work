const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');

const PORT = 3000;
const app = express();
const { apolloExpress, graphiqlExpress } = require('apollo-server');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/users', (err) => {
  if (err) {
    return err;
  }
  return true;
});

const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});


app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
  schema: executableSchema,
  context: {
    token: request.headers.authorization,
    constructor: Connectors,
  }
})));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
