const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  id: String,
  name:String,
  created_at: Date,
  email: Number,
  text: String
});

module.exports = model('comment', commentSchema);
