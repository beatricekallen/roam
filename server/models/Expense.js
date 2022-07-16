const { Schema } = require('mongoose');
const debtorSchema = requre('./Debtor');

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
    balance: {
      type: Number,
      required: true
    },
    split: {
      type: String,
      required: true
    }
  }, 
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
