const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [ObjectId],
      ref: "User",
    },
    deletedBy: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);