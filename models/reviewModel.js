const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  product_id: String,
  customer_id: String,
  created_at: Date,
  mark: Number,
  text: String,
});

module.exports = model('Review', reviewSchema, 'Review');
