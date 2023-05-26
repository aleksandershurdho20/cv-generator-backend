const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    conversation:{
      type: ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: ObjectId,
      ref: "User",
    },
    receiver: {
      type: ObjectId,
      ref: "User",
    },

    message:{
      type:String
    }
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
