const { Schema, model } = require("mongoose");

const SubcategorySchema = new Schema({
  name: String,
  productCount: Number,
});

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [SubcategorySchema]
});

module.exports = model('Category', CategorySchema);
