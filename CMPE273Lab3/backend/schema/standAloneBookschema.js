const graphql = require('graphql');
const _ = require('lodash'); // lodash has many utlity functions that will be very helpful

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,
} = graphql;

const books = [
  { name: 'Gone with the wind', genre: 'Fantasy', id: '1' },
  { name: 'Great gatsyby', genre: 'novel', id: '2' },
];

const authors = [
  { name: 'Chetan Bhagat', age: 45, id: '1' },
  { name: 'Mitchell Margaret', age: 90, id: '2' },
];

/*
{
	book(id: "1") {
  	name
    genre
	}
}
=>
{
  "data": {
    "book": {
      "name": "Gone with the wind",
      "genre": "Fantasy"
    }
  }
}
*/

// Defining a schema here of how a Book GraphQL object be like
const BookType = new GraphQLObjectType({
  name: 'Book',
  // Wrapping this inside a function becuase otherwise JS wont know what AuthorType is.
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // this 'book' says that book : {...} will be querying format
    book: {
      // type property gives information on which schema are you going to query on.
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code here to get data from db or other data source.
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

// Export this query so that it can be used elsewhere.
module.exports = new GraphQLSchema({
  query: RootQuery,
});
