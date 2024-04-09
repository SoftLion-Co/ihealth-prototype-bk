const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  email: String,
  category: String,
  created_at: Date
});

module.exports = model('subscription', subscriptionSchema);
