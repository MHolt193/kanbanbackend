const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    title: String,
    description: String,
    subtasks: Array,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
