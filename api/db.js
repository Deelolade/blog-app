require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log("connected to mongodb")

    } catch (error) {
        console.log("error connecting to mongodb", error)
    }
}

module.exports = connectDB;