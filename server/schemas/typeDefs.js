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
    creator: String
    members: [String]
    name: String
    createdAt: String
    location: String
    attractions: [Attraction]
    budget: String
    transportation: String
    dates: String
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

  input EmailInput {
    email: String
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
    addFriend(friendId: ID!): User
    addTrip(name: String!, location: String, dates: String, transportation: String, budget: String, members: [String]): Trip
    deleteTrip(_id: ID!): Trip
  }
`;

module.exports = typeDefs;

// addTrip(name: String!, location: String, dates: String, transportation: String, budget: String): Trip