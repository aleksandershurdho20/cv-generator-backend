// const express = require("express")
// const app = express()
// require("dotenv").config();
// const { readdirSync } = require("fs")
// const cors = require("cors");
// const bodyParser = require('body-parser')

// app.use(cors())
// app.use(express.json())
// app.use(bodyParser.urlencoded({extended:false}))

// readdirSync("./routes").map((route) =>
//     app.use("/api", require(`./routes/${route}`))
// );

// const PORT = process.env.PORT || 5000


// app.listen(PORT,() => {
//     console.log(`Running  on  ${PORT}`)
// })


const express = require('express')
const app = express();
require("dotenv").config();
const Database = require('./database/Database')
const { readdirSync } = require("fs")
const cors = require("cors");
const bodyParser = require('body-parser')

Database()
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
readdirSync("./routes").map((route) =>
    app.use("/api", require(`./routes/${route}`))
);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('running on ', PORT)
})