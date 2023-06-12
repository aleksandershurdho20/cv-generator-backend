const Conversation = require("../models/Conversation");
const Messages = require("../models/Messages");
const { ObjectId } = require('mongodb');

const createConversation = async (req, res) => {
  const {params,...rest}= req.body
  try {
    const converSationExist =  await Conversation.findOne({
      members: { $in: [params.receiver] },
    })
    if(converSationExist){
      const data = {...params,conversation:ObjectId(converSationExist._id).valueOf()}
    const messages =  await new Messages(data).save()
     res.status(201).json(messages)
    }
    else{

      const conversation = await new Conversation(rest).save();
      const data = {...params,conversation:ObjectId(conversation._id).valueOf()}
       await new Messages(data).save()
      res.status(201).json(conversation);
    }
  } catch (error) {
    console.log(error)
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
          { path: "companyProfileId", select: "name user image" },
          { path: "userProfileId", select: "name last_name user image" },
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
