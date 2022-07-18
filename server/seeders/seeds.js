// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const db = require('../config/connection');
const { User, Trip } = require('../models');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    await Trip.deleteMany({});

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});