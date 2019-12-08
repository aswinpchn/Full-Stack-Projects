const graphql = require('graphql');
const _ = require('lodash'); // lodash has many utlity functions that will be very helpful

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

var books = [
];

var authors = [
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
        authorId: { type: GraphQLID }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString }
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
        }
    }
});

/*
mutation {
	addAuthor(name: "Chetan Bhagat", age: 45) {
    id
  	name
    age
  }
}
=>
{
  "data": {
    "addAuthor": {
      "id": "2",
      "name": "Chetan Bhagat",
      "age": 45
    }
  }
}
*/

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: authors.length+1
                }

                authors.push(author);
                // It is mandatory that you have to return something even when you create, thats how graphQL expects., so we are returning the newly created one.
                return _.find(authors, { id: authors.length });
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id: books.length+1
                }

                books.push(book);
                // It is mandatory that you have to return something even when you create, thats how graphQL expects., so we are returning the newly created one.
                return _.find(books, { id: books.length });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})