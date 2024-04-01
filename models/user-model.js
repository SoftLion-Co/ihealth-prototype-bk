const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  authType: { type: String, default: "credentials" },
});

module.exports = model("User", UserSchema);
