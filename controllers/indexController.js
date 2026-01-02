const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

module.exports.home = async (req, res) => {
    let products = await productModel.find();

    //pehle ham isLoggedin midd se karte the, lekin ab nahi kar skte, bcs / bina loggin ke bhi dikhana hai
    let isUserLoggedIn = req.cookies.token ? true : false;

    res.render("shop", { products, loggedin: isUserLoggedIn });
}


module.exports.showCart = async (req,res) => {
    let user = await userModel
        .findOne({email: req.user.email})
        .populate("cart"); //.populate IDs ko actual product data se replace kar deta hai
    
    
    let totalMRP = 0;
    let discount = 0;
        
    user.cart.forEach(product => {
        totalMRP += product.price;
        discount += product.discount;
    })
    
    const bill = totalMRP + 20 - discount;
    
    //console.log(bill);
    //console.log(user.cart);
    res.render("cart", { user, loggedin: true, totalMRP, discount, bill});
}

module.exports.addToCart = async (req, res) => {
    let { id } = req.params;
    let user = await userModel.findOne({email: req.user.email});
   
    user.cart.push(id);
    await user.save();

    req.flash("success", "Product is added to cart");
    res.redirect("/");
}

module.exports.removeFromCart = async (req, res) => {
    let userId= req.user._id;
    //console.log(userId);
    let productId = req.params.id; // this is product id
    //console.log(productId);

    try{
        let user = await userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: {cart: productId} },
            { new: true},
        )

        req.flash("success", "item removed from cart");
        res.redirect("/cart");

    } catch(err) {
        req.flash("error", "Delete failed: We couldn't delete your item. Try again.")
    }

}