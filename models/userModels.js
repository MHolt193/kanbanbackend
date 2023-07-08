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
    notifications: [
      {
        id: {
          type: mongoose.Types.ObjectId,
        },
        invitedTo: {
          type: String,
        },
        status: {
          type: String,
        },
        boardName: {
          type: String,
        },
        invitedBy: {
          type: String,
        },
      },
    ],
    sharedBoards: [Object],
  },
  { timestamps: true }
);
userSchema.index({ "$**": "text" });

module.exports = mongoose.model("User", userSchema);
