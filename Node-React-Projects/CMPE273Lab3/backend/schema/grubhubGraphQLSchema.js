const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = graphql;

var users = [];

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLString,
    },
    firstname: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    isOwner: {
      type: GraphQLBoolean,
    },
    restaurantInfo: {
      type: restaurantType,
    },
  }),
});

const restaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    cuisine: {
      type: GraphQLString,
    },
    sections: {
      type: new GraphQLList(sectionsType),
    },
  }),
});

const sectionsType = new GraphQLObjectType({
  name: 'Sections',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    items: {
      type: new GraphQLList(itemsType),
    },
  }),
});

const itemsType = new GraphQLObjectType({
  name: 'Items',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLFloat,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    userByEmail: {
      type: userType,
      args: {
        email: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        console.log(users);
        return _.find(users, {
          email: args.email,
        });
      },
    },
    allUsers: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return users;
      },
    },
  },
});

var userCount = 101;
var sectionCount = 101;
var itemCount = 101;
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    addUser: {
      type: userType,
      args: {
        firstname: {
          type: GraphQLString,
        },
        lastname: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        isOwner: {
          type: GraphQLBoolean,
        },
      },
      resolve(parent, args) {
        const user = {
          id: userCount++,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
          isOwner: args.isOwner,
          restaurantInfo: {
            name: '',
            cuisine: '',
            sections: [],
          },
        };
        users.push(user);
        console.log(users);
        return user;
      },
    },

    updateProfile: {
      type: userType,
      args: {
        userId: {
          type: GraphQLString,
        },
        firstname: {
          type: GraphQLString,
        },
        lastname: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        let index;
        let isAdded = false;
        for (index in users) {
          if (users[index].id == args.userId) {
            users[index].firstname = args.firstname;
            users[index].lastname = args.lastname;
            users[index].email = args.email;
            users[index].password = args.password;
            isAdded = true;
            break;
          }
        }
        return isAdded;
      },
    },

    restaurantInfo: {
      type: userType,
      args: {
        userId: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        cuisine: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        let index;
        for (index in users) {
          if (users[index].id == args.userId) {
            users[index].restaurantInfo.name = args.name;
            users[index].restaurantInfo.cuisine = args.cuisine;
            isAdded = true;
            break;
          }
        }
        return isAdded;
      },
    },

    addSection: {
      type: userType,
      args: {
        userId: {
          type: GraphQLString,
        },
        sectionName: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        let index;
        let isAdded = false;
        newSection = {};
        for (index in users) {
          if (users[index].id == args.userId) {
            newSection.id = sectionCount++;
            newSection.name = args.sectionName;
            newSection.items = [];
            users[index].restaurantInfo.sections.push(newSection);
            isAdded = true;
            break;
          }
        }
        return isAdded;
      },
    },

    addItem: {
      type: userType,
      args: {
        userId: {
          type: GraphQLString,
        },
        sectionId: {
          type: GraphQLString,
        },
        itemName: {
          type: GraphQLString,
        },
        itemDescription: {
          type: GraphQLString,
        },
        itemPrice: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        let index;
        let index1;
        let isAdded = false;
        newItem = {};
        for (index in users) {
          if (users[index].id == args.userId) {
            for (index1 in users[index].restaurantInfo.sections) {
              if (users[index].restaurantInfo.sections[index1].id == args.sectionId) {
                newItem = {
                  id: itemCount++,
                  name: args.itemName,
                  description: args.itemDescription,
                  price: args.itemPrice,
                };
                users[index].restaurantInfo.sections[index1].items.push(newItem);
              }
            }
            isAdded = true;
            break;
          }
        }
        return isAdded;
      },
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
