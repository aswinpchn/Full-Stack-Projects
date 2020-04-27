const express = require('express');
const graphqlHTTP = require('express-graphql');
var cors = require('cors')
// const schema = require('./schema/standAloneBookschema');
// const schema = require('./schema/complexBookschema');
// const schema = require('./schema/BookWithMutationSchema');
const schema = require('./schema/grubhubGraphQLSchema');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/graphql', graphqlHTTP({
  schema, // ES6 so if name same, one time writing is enough
  graphiql: true, // This makes this URL as UI like thing to test queries
}));
app.listen(8080, () => console.log('Now browse to localhost:8080/graphql'));
