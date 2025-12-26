const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    pannelcolor: String,
    textcolor: String,
});

module.exports = mongoose.model("Product", productSchema);