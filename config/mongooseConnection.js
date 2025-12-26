const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/backendProject";

async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL, {
            auth: {
                username: "amanAdmin",
                password: "Backend@987",
            },
            authSource: "admin",
        });
        console.log("connected to DB");
    } catch(err){
        console.log("Error connecting to DB: ",err);
    }
}

module.exports = connectDB;