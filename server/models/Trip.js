const { Schema, model } = require("mongoose");
const attractionSchema = require('./Attraction');
const expenseSchema = require('./Expense');
const getFormattedDate = require("../utils/dateFormat");

const tripSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    dates: {
      type: String,
      trim: true
    },
    attractions: [attractionSchema],
    expenses: [expenseSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
