const { Schema } = require('mongoose');

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
    debtors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    balance: {
      type: String,
      required: true
    }
  }
);

module.exports = expenseSchema;
