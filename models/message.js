const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 50 },
  message: { type: String, required: true, minLength: 10, maxLength: 500 },
  authorID: { type: Schema.ObjectId, required: true, ref: "Users"},
  authorName: { type: String, required: true},
  time: { type: Date, required: true }
});


// Export model
module.exports = mongoose.model("Message", MessageSchema);
