const { Schema } = require('mongoose');
const getFormattedDate = require('../utils/dateFormat');

const attractionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    date: {
      type: Date,
      get: timestamp => getFormattedDate(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = attractionSchema;
