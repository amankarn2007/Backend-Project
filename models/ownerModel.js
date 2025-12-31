const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    product: {
        type: Array,
        default: [],
    },
    picture: String,
    gstin: String,
})


module.exports = mongoose.model("Owner", ownerSchema);