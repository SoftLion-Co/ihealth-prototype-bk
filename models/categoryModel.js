const { Schema, model } = require("mongoose");

const SubcategorySchema = new Schema({
  name: String,
  productCount: Number,
  displayName: String,
});

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  subcategories: [SubcategorySchema]
});

module.exports = model('Category', CategorySchema, 'Category');
