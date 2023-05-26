const Messages = require("../models/Messages")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const createMessage = async(req,res) =>{
    try {
        const messages = await new Messages(req.body).save()
        res.status(201).json(messages)
    } catch (error) {
        res.stauts(500).send(error)
    }
}


const getMessages = async(req,res) =>{
    const {id}= req.params
    
    try {
        const messages = await Messages

        .find({
            $or: [
                { "sender": id },
                { "receiver": id }
            ]
        })
        .populate('sender')
        .populate({
          path: 'receiverUser',
        })
        .exec();
        
        res.json(messages)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}


const getMessagesByConversation = async(req,res) =>{
    const {id} = req.params
    try {
        const messages = await Messages.find({conversation:id})
        res.json(messages)


    } catch (error) {
        res.status(500).send(error)
  
    }
}

module.exports = {
    createMessage,
    getMessages,
    getMessagesByConversation
}