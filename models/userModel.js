const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [ //cart is a array, that store id of products
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("User", userSchema);