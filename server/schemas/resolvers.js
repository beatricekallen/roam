const { AuthenticationError } = require("apollo-server-express");
const { User, Trip, Expense } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");
const getUrl = require("../utils/oauthHelper");

const resolvers = {
  Query: {
    loginAuth: async () => {
      try {
        const urlData = await getUrl();

        return JSON.stringify(urlData);
      } catch (err) {
        console.log(err);
      }
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("trips")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("trips")
        .populate("friends");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("trips")
        .populate("friends");
    },
    trip: async (parent, { _id }) => {
      return Trip.findOne({ _id }).populate("members");
    },
    trips: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Trip.find(params).sort({ createdAt: -1 }).populate("members");
    },
    my_trips: async (parent, args, context) => {
      if (context.user) {
        const tripData = await Trip.find({})
          .populate('members');

        return tripData;
      }

      throw new AuthenticationError("Not logged in");
    },
    user_trips: async (parent, { _id }) => {
      const userData = await User.findOne({ _id })
        .select("trips")
        .populate("trips");

      return userData;
    },
    my_expenses: async (parent, args, context) => {
      if (context.user) {
        const owedExpenseData = await Expense.find({ payer: context.user._id })
          .populate('trip')
          .populate('borrowers');

        const borrowingExpenseData = await Expense.find({
          'borrowers': { $in: [
            mongoose.Types.ObjectId(context.user._id)
          ]}
        })
          .populate('trip')
          .populate('borrowers');

        return {
          owed: owedExpenseData,
          borrowing: borrowingExpenseData
        }
      }

      throw new AuthenticationError("Not logged in");
    },
    trip_expenses: async (parent, { _id }, context) => {
      if (context.user) {
        return await Expense.find({ trip: _id })
          .populate('borrowers');
      }

      throw new AuthenticationError("Not logged in");
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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in");
    },
    addTrip: async (parent, args, context) => {
      if (context.user) {
        // create trip
        const trip = await Trip.create({
          ...args,
          creator: context.user.username,
          members: [mongoose.Types.ObjectId(context.user._id), ...(args.members ? args.members.map(id => mongoose.Types.ObjectId(id)) : [])]
        });

        if (trip) {
          // add trip to each members trip array
          trip.members.forEach(async (member) => {
            return await User.findOneAndUpdate(
              { _id: member },
              { $push: { trips: trip } }
            );
          });
        }
        return trip;
      }

      throw new AuthenticationError("You need to be logged in");
    },
    deleteTrip: async (parent, { _id }, context) => {
      if (context.user) {
        const trip = await Trip.findOne({ _id }).populate("members");

        trip.members.forEach(async (member) => {
          await User.findOneAndUpdate(
            { email: member },
            { $pull: { trips: mongoose.Types.ObjectId(_id) } }
          );
        });

        return await Trip.findOneAndDelete({ _id });
      }

      throw new AuthenticationError("You need to be logged in");
    },
    updateTrip: async (parent, args, context) => {
      if (context.user) {
        const _id = args._id;

        const trip = await Trip.findByIdAndUpdate(
          { _id },
          { $set:
            {
              // spread and short circuit operators to conditionally update elements
              ...args.location && {location: args.location},
              ...args.startDate && {startDate: args.startDate},
              ...args.endDate && {endDate: args.endDate},
              ...args.transportation && {transportation: args.transportation},
              ...args.budget && {budget: args.budget}
            },
            // update members conditionally
            ...args.members[0] && {$addToSet: { members: { $each: args.members.map(id => mongoose.Types.ObjectId(id)) } } }
          },
          { new: true }
        );

        return trip;
      }

      throw new AuthenticationError("You need to be logged in");
    },
    removeTripMember: async(parent, { memberId, tripId }, context) => {
      if (context.user) {
        return await Trip.findByIdAndUpdate(
          tripId,
          { $pull: { members: memberId } },
          { new: true }
        ).populate('members');
      }

      throw new AuthenticationError("You need to be logged in");
    },
    addExpense: async(parent, { item, price, tripId }, context) => {
      if (context.user) {
        const { _id, members } = await Trip.findById(tripId)
          .populate('members')
          .select('members');

        // remove expense payer from list
        const memberData = members.filter(member => member._id != context.user._id)

        const expenseData = await Expense.create({
          item,
          totalPrice: parseInt(price),
          // round to 2 decimal places
          pricePerPerson: Math.round(parseInt(price) / members.length * 100) / 100,
          trip: _id,
          payer: context.user._id,
          borrowers: memberData.map(member => member._id),
        });

        return expenseData;
      }

      throw new AuthenticationError("You need to be logged in");
    },
    deleteExpense: async(parent, { _id }, context) => {
      if (context.user) {
        return await Expense.findByIdAndDelete(_id)
      }

      throw new AuthenticationError("You need to be logged in");
    },
    payOffExpense: async(parent, { _id }, context) => {
      if (context.user) {
        return await Expense.findByIdAndUpdate(
          _id,
          { $pull: { borrowers: context.user._id } },
          { new: true }
        )
        .populate('borrowers')
        .populate('trip');
      }

      throw new AuthenticationError('You need to be logged in');
    }
  },
};

module.exports = resolvers;
