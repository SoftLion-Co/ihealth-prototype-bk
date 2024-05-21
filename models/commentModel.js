const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
	blog_post_id:String,
  name:String,
  created_at: Date,
  email: String,
  text: String
});

module.exports = model('Comment', commentSchema, 'Comment');
