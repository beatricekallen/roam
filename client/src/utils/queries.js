import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user ($username: String!) {
    user(username: $username) {
      _id
      username
      email
      trips {
        _id
        name
        location
        createdAt
        dates
        members
        budget
        creator
      }
      friendCount
      friends {
        _id
        email
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
{
  me {
    _id
    email
    username
    trips {
      _id
      name
      location
      createdAt
      dates
      members
      budget
      creator
    }
    friendCount
    friends {
      _id
      email
      username
    }
  }
}
`;


export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      trips {
        _id
        name
        dates
      }
    }
  }
`;

export const QUERY_TRIP = gql`
  query trip($_id: ID!) {
    trip(_id: $_id) {
      _id
      name
      creator
      members
      transportation
      budget
      dates
      location
      createdAt
    }
  }
`;

export const QUERY_MY_TRIPS = gql`
  query my_trips {
    my_trips {
      trips {
        _id
        name
        creator
        members
        transportation
        budget
        dates
        location
      }
    }
  }
`;

export const QUERY_MY_TRIPS_BASIC = gq;`
  query my_trips {
    my_trips {
      trips {
        _id
        name
        dates
        location
      }
    }
  }
`;
