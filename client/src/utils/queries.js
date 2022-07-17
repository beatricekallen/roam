import { gql } from "@apollo/client";

export const LOGIN_AUTH = gql`
  query loginAuth {
    loginAuth
  }
`;

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
        startDate
        endDate
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
  query me {
    me {
      _id
      email
      username
      trips {
        _id
        name
        location
        createdAt
        status
        members {
          _id
          username
          email
        }
        budget
        creator
        startDate
        endDate
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
    }
  }
`;

export const QUERY_TRIP = gql`
  query trip($_id: ID!) {
    trip(_id: $_id) {
      _id
      name
      creator
      members {
        _id
        email
        username
      }
      transportation
      budget
      startDate
      endDate
      location
      status
      createdAt
      memberCount
    }
  }
`;

export const QUERY_MY_TRIPS = gql`
  query my_trips {
    my_trips {
      _id
      name
      creator
      members {
        email
        _id
        username
      }
      budget
      transportation
      startDate
      endDate
      location
      status
    }
  }
`;

// export const QUERY_MY_TRIPS_BASIC = gql`
//   query my_trips {
//     my_trips {
//       trips {
//         _id
//         name
//         startDate
//         endDate
//         location
//       }
//     }
//   }
// `;

// export const QUERY_USER_TRIPS = gql`
//   query user_trips($id: ID!) {
//     user_trips(_id: $id) {
//       trips {
//           _id
//         name
//         creator
//         transportation
//         budget
//         startDate
//         endDate
//         location
//       }
//     }
//   }
// `;
