const graphql = require('graphql');
const _ = require('lodash'); // lodash has many utlity functions that will be very helpful

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var books = [
    {name: 'Gone with the wind', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'two states', genre: 'novel', id: '1', authorId: '1'},
    {name: 'one Night', genre: 'drama', id: '3', authorId: '1'}
];

var authors = [
    {name: 'Chetan Bhagat', age: 45, id: '1'},
    {name: 'Mitchell Margaret', age: 90, id: '2'}
];

/*
{
	book(id: 1) {
        name
        genre
        author{
            name
        }
	} 
}
=>
{
  "data": {
    "book": {
      "name": "two states",
      "genre": "novel",
      "author": {
        "name": "Chetan Bhagat"
      }
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
        // Here were are creating a link from book to author
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent will have the whole book object that was found when querying
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString },
        books: {
            // List becuase there will be more than one book for an author
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
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
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        // This root query is to return all books <Not we can also nest to get authors as we have defined them in schema...>
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

// Export this query so that it can be used elsewhere.
module.exports = new GraphQLSchema({
    query: RootQuery
})