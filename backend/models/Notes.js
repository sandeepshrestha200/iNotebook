const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: { type: String, require: true },
  description: { type: String, require: true },
  tag: { type: String, default: "Uncaregorized" },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("notes", NotesSchema);
