var express = require('express');
var graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

var app = express();
app.use('/graphql', graphqlHTTP({
    schema, // ES6 so if name same, one time writing is enough
    graphiql : true // This makes this URL as UI like thing to test queries
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));