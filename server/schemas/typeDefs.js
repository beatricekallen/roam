const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    trips: [Trip]
    friends: [User]
  }

  type Trip {
    _id: ID
    creator: User
    members: [User]
    createdAt: String
    location: String
    date: String
    attractions: [Attraction]
    expenses: [Expense]
  }

  type Attraction {
    _id: ID
    name: String
    address: String
    date: String
  }

  type Expense {
    _id: ID
    item: String
    price: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    trip(_id: ID!): Trip
    trips(username: String): [Trip]
    expenses(_id: ID!): [Expense]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
