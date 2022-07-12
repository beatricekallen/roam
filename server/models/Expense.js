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
    }
  }
);

module.exports = expenseSchema;
