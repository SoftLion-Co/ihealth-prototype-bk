const { Schema, model } = require("mongoose");

const LinkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  link: { type: String, required: true },
});

module.exports = model("Link", LinkSchema);
