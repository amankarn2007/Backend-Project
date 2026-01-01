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
    product: [ //product is the array, that store id's of products
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        }
    ],
    picture: String,
    gstin: String,
})


module.exports = mongoose.model("Owner", ownerSchema);