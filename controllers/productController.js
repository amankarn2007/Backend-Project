const productModel = require("../models/productModel");

module.exports.productCreate = async (req, res) => {
    try{
        let {name, price, discount, bgcolor, pannelcolor, textcolor} = req.body;
        
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            pannelcolor,
            textcolor,
        });
        
        req.flash("success", "Product created successfully");
        res.redirect("/adminPannel");
    } catch(err) {
        req.flash("error", "err.msg");
    }
}