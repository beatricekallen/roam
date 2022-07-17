const { Schema, model } = require("mongoose");
const attractionSchema = require('./Attraction');
const getFormattedDate = require("../utils/dateFormat");
const compareDates = require('../utils/compareDates');

const tripSchema = new Schema(
  {
    creator: {
      type: String,
      required: true
    },
    members: [
      {
        type: String,
        trim: true
      }
    ],
    name: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: new Date,
      get: timestamp => getFormattedDate(timestamp)
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Expense'
      }
    ],
    transportation: {
      type: String,
      trim: true
    },
    attractions: [attractionSchema],
    budget: {
      type: String,
      trim: true
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

tripSchema.virtual('status').get(function() {
  return compareDates(this.startDate, this.endDate);
});

tripSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
