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

async function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization
              if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
          if (err) throw err;
          resolve(userData);
        });
      } else {
        reject('no token');
      }
    });
  
  }
const getMessages = async(req,res) =>{
    const {id}= req.params
    
    try {
        const userData = await getUserDataFromRequest(req);
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

module.exports = {
    createMessage,
    getMessages
}