const mongoose = require('mongoose')

const Database = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("database connect success");
    } catch (error) {
        console.log("database errorr", error);
    }
}

module.exports = Database