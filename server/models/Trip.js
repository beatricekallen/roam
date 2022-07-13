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
    createdAt: {
      type: Date,
      default: new Date,
      get: timestamp => getFormattedDate(timestamp)
    },
    location: {
      type: String,
      trim: true,
    },
    dateStart: {
      type: Date,
    },
    dateEnd: {
      type: Date,
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

tripSchema.virtual('date').get(function() {
  return `${this.dateStart} - ${this.dateEnd}`;
})

const Trip = model("Trip", tripSchema);

module.exports = Trip;
