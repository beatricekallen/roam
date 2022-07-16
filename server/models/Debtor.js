const { Schema } = require('mongoose');

const debtorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }
);

module.exports = debtorSchema;
