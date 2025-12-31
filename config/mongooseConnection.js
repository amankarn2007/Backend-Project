const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

const MONGO_URL = `${config.get("MONGODB_URL")}/backendProject`;

async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL, {
            auth: {
                username: "amanAdmin",
                password: "Backend@987",
            },
            authSource: "admin",
        });
        dbgr("connected to DB");
    } catch(err){
        dbgr("Error connecting to DB: ",err);
    }
}

connectDB();

module.exports = connectDB;