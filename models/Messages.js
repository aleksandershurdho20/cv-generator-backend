const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    receiver: {
      type: ObjectId,
      ref: "User",
    },

    messages: [
      {
        text: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
messageSchema.virtual('receiverUser', {
  ref: 'User',
  localField: 'receiver',
  foreignField: '_id',
  justOne: true
});


module.exports = mongoose.model("Messages", messageSchema);
