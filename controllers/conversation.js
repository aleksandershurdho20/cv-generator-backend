const Conversation = require("../models/Conversation");
const Messages = require("../models/Messages");

const createConversation = async (req, res) => {
  try {
    const conversation = await new Conversation(req.body).save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserConversations = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.find({
      members: { $in: [id] },
    })
      .populate({
        path: "members",
        select: "_id",
        populate: [
          { path: "companyProfileId", select: "name user" },
          { path: "userProfileId", select: "name last_name user" },
        ],
      })
      .exec();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const deleteUserConversation = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  console.log(id, user, "oo");
  try {
    const conversation = await Conversation.findOne({ _id: id, members: user });
    if (!conversation) {
      return res.status(400).send("Biseda ose Perdoruesi nuk u gjet!");
    }
    await Conversation.findByIdAndDelete(id);
    await Messages.deleteMany({ conversation: id });
    // await Conversation.findByIdAndUpdate(id,{
    //     $pull:{
    //         members:user
    //     }
    // })
    res.status(200).send("U fshi me sukses!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const deleteConversation = async (req, res) => {
  const { id } = req.params;
  try {
    await Conversation.findByIdAndDelete(id);
    res.status(200).send("Deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createConversation,
  getUserConversations,
  deleteConversation,
  deleteUserConversation,
};
