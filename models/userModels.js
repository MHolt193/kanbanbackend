const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email Already Registered"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
  },
  { timestamps: true }
);
userSchema.index({ "$**": "text" });

module.exports = mongoose.model("User", userSchema);
