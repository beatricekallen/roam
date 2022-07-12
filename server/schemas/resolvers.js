const { AuthenticationError } = require('apollo-server-express');
const { User, Trip } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
    },
    trip: async (parent, { _id }) => {
      return Trip.findOne({ _id })
        .populate('members');

    },
    trips: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Trip.find(params).sort({ createdAt: -1 })
        .populate('members');

    },
    expenses: async (parent, { _id }) => {
      return Trip.findOne({ _id })
        .select('expenses');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (parent, args, context) => {
      if (context.user) {
        // context.user._id for creator User
        const creatorData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        // look up members by looping through args.members, which contains user emails
        const membersData = await Promise.all(args.members.map(async email => {
          return await User.findOne({ email })
            .select('-__v -password');
        }));
        
        const updatedArgs = [{creator: creatorData}, {members: membersData}, ...args];

        return await Trip.create(updatedArgs);
      }

      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
