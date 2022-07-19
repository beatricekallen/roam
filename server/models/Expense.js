const { Schema, model } = require('mongoose');

const expenseSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    pricePerPerson: {
      type: Number,
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    payer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    borrowers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
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

expenseSchema.virtual('balance').get(function() {
  return this.pricePerPerson * this.borrowers.length;
});

expenseSchema.virtual('paidOff').get(function() {
  return !!this.borrowers.length;
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
