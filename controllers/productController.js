const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

module.exports.productCreate = async (req, res) => {
    try{
        let {name, price, discount, bgcolor, pannelcolor, textcolor} = req.body;

        let adminId = req.admin._id;
        //console.log(req.admin._id);

        let product = await productModel.create({
            image: req.file.buffer,
            owner: adminId,
            name,
            price,
            discount,
            bgcolor,
            pannelcolor,
            textcolor,
        });
        
        //owner me product ka aur product me owner ka id dena padega
        let owner = await ownerModel.findById(adminId);
        owner.product.push(product._id);
        await owner.save();

        req.flash("success", "Product created successfully");
        res.redirect("/admin/adminDashboard");
    } catch(err) {
        req.flash("error", "err.msg");
    }
}