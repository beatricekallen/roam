const { gql } = require("apollo-server-express");

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
    expenses: [Expense]
    transportation: String
    startDate: String
    endDate: String
    budget: String
  }

  type Attraction {
    _id: ID
    name: String
    address: String
    date: String
  }

  type Expense {
    item: String
    price: String
    owner: User
  }

  input ExpenseInput {
    item: String!
    price: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    loginAuth: String
    me: User
    users: [User]
    user(username: String!): User
    trip(_id: ID!): Trip
    trips(username: String): [Trip]
    my_trips: User
    user_trips(_id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addTrip(name: String!, location: String, startDate: String, endDate: String, transportation: String, budget: String, members: [String]): Trip
    deleteTrip(_id: ID!): Trip
    updateTrip(_id: ID!, location: String, startDate: String, endDate: String, transportation: String, budget: String, members: [String]): Trip
    addExpense(_id: ID!, expense: ExpenseInput!): Trip
  }
`;

module.exports = typeDefs;
