

const express = require('express')
const app = express();
require("dotenv").config();
const Database = require('./database/Database')
const { readdirSync } = require("fs")
const cors = require("cors");
const bodyParser = require('body-parser')
const {Server} = require("socket.io")

const io = new Server({cors:"http://localhost:8000"})
Database()
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
readdirSync("./routes").map((route) =>
    app.use("/api", require(`./routes/${route}`))
);
app.use('/uploads', express.static('uploads'))

let onlineUsers = []
io.on("connection",(socket) =>{
    console.log("new connection" + socket)
    socket.on("addNewUser",(userId) =>{
        !onlineUsers.some(user => user.userId === userId)&&
        onlineUsers.push({
            userId,
            socketId:socket.id
        })
        console.log(onlineUsers)
    })
    io.emit("getOnlineUsers",onlineUsers)

    socket.on("sendMessage",(message) =>{
        const user = onlineUsers.find(user => user.userId == message.id)
        if(user){
            console.log(user,message.id,'user')
            io.to(user.socketId).emit("getMessage",message)
        }
    })
    socket.on("disconnect",()=>{
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id )
        io.emit("getOnlineUsers",onlineUsers)

    })
})


io.listen(3001)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('running on ', PORT)
})