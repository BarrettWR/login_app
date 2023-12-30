const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: { type: String, required: true, minLength: 1, maxLength: 40 },
  userName: { type: String, required: true, minLength: 1, maxLength: 40 },
  password: { type: String, required: true, minLength: 1 },
  email: { type: String, required: true, minLength: 1},
  membership: { type: Boolean, required: true }
});


// Export model
module.exports = mongoose.model("User", UserSchema);
