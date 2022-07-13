import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip($name: String!, $location: String, $dates: String, $transportation: String, $budget: String, $members: [String]) {
    addTrip(name: $name, location: $location, dates: $dates, transportation: $transportation, budget: $budget, members: $members) {
      creator
      _id
      name
      location
      dates
      transportation
      budget
      createdAt
      members
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($_id: ID!) {
    deleteTrip(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation updateTrip($id: ID!, $location: String, $dates: String, $transportation: String, $budget: String, $members: [String]) {
    updateTrip(_id: $id, location: $location, dates: $dates, transportation: $transportation, budget: $budget, members: $members) {
      _id
      location
      dates
      transportation
      budget
      members
      name
    }
  }
`;
