// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const tripSeeds = require('./tripSeed.json');
const db = require('../config/connection');
const { User, Trip, Expense } = require('../models');

db.once('open', async function() {
  try {
    await User.deleteMany({});
    await Trip.deleteMany({});
    await Expense.deleteMany({});

    const userData = await User.create(userSeeds);

    const seedOneId = userData[0]._id;
    const seedTwoId = userData[1]._id;
    const seedThreeId = userData[2]._id;
    const seedFourId = userData[3]._id;
    const seedOneFriends = userData.filter((user, i) => i == 1 || i == 2 || i == 3);
    const seedTwoFriends = userData.filter((user, i) => i == 0 || i == 2 || i == 3);
    const seedThreeFriends = userData.filter((user, i) => i == 0 || i == 1 || i == 3);
    const seedFourFriends = userData.filter((user, i) => i == 0 || i == 1 || i == 2);

    // add first four users to each others friend array
    await User.findByIdAndUpdate(
      seedOneId,
      { $push: { friends: { $each: seedOneFriends.map(friend => friend._id) } } }
    );
    await User.findByIdAndUpdate(
      seedTwoId,
      { $push: { friends: { $each: seedTwoFriends.map(friend => friend._id) } } }
    );
    await User.findByIdAndUpdate(
      seedThreeId,
      { $push: { friends: { $each: seedThreeFriends.map(friend => friend._id) } } }
    );
    await User.findByIdAndUpdate(
      seedFourId,
      { $push: { friends: { $each: seedFourFriends.map(friend => friend._id) } } },
      { new: true }
    );

    const updatedTripSeeds = tripSeeds.map(trip => {
      return {...trip, members: [seedOneId, seedTwoId, seedThreeId, seedFourId]}
    });

    // create trips
    const tripData = await Trip.create(updatedTripSeeds);

    // add trips to each created user trip array
    await User.findOneAndUpdate(
      { _id: seedOneId },
      { $push: { trips: {$each: tripData } } }
    );
    await User.findOneAndUpdate(
      { _id: seedTwoId },
      { $push: { trips: {$each: tripData } } }
    );
    await User.findOneAndUpdate(
      { _id: seedThreeId },
      { $push: { trips: {$each: tripData } } }
    );
    await User.findOneAndUpdate(
      { _id: seedFourId },
      { $push: { trips: {$each: tripData } } }
    );

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});