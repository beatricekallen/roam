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
    members: [User]
    name: String
    createdAt: String
    location: String
    attractions: [Attraction]
    expenses: [Expense]
    transportation: String
    startDate: String
    endDate: String
    budget: String
    status: String
    memberCount: Int
  }

  type Expense {
    _id: ID
    item: String
    totalPrice: Int
    pricePerPerson: Int
    trip: Trip
    payer: User
    borrowers: [User]
    split: String
    balance: Int
  }

  type Attraction {
    _id: ID
    name: String
    address: String
    date: String
  }

  type MyExpenses {
    owed: [Expense]
    borrowing: [Expense]
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
    my_trips: [Trip]
    user_trips(_id: ID!): User
    my_expenses: MyExpenses
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addTrip(name: String!, location: String, startDate: String, endDate: String, transportation: String, budget: String, members: [ID]): Trip
    deleteTrip(_id: ID!): Trip
    updateTrip(_id: ID!, location: String, startDate: String, endDate: String, transportation: String, budget: String, members: [ID]): Trip
    addExpense(tripId: ID!, item: String!, price: String!, split: String): Expense
    deleteExpense(_id: ID!): Expense
  }
`;

module.exports = typeDefs;
