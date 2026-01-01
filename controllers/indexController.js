const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

module.exports.home = (req, res) => {
    res.render("index", {loggedin: false});
}

module.exports.showShop =  async (req, res) => {
    let products = await productModel.find();
    res.render("shop", {products});
}

module.exports.showCart = async (req,res) => {
    let user = await userModel
        .findOne({email: req.user.email})
        .populate("cart");
    
    
    let totalMRP = 0;
    let discount = 0;
        
    user.cart.forEach(product => {
        totalMRP += product.price;
        discount += product.discount;
    })
    
    const bill = totalMRP + 20 - discount;
    
    //console.log(bill);
    //console.log(user.cart);
    res.render("cart", { user, totalMRP, discount, bill});
}

module.exports.addToCart = async (req, res) => {
    let { id } = req.params;
    let user = await userModel.findOne({email: req.user.email});
   
    user.cart.push(id);
    await user.save();

    req.flash("success", "Product is added to cart");
    res.redirect("/shop");
}

module.exports.showAdminPannel = async (req, res) => {
    let products = await productModel.find();
    res.render("adminPannel", {products});
}