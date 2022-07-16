const { Schema, model } = require('mongoose');
const debtorSchema = require('./Debtor');

const expenseSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      trim: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    debtors: [debtorSchema],
    owers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    balance: {
      type: Number,
      required: true
    },
    split: {
      type: String,
      required: true,
      default: 'equal'
    },
    // split types:
    // equal between all members automatically - MVP
    // percent - reach
    // flat - reach
  }, 
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
