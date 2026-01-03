const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");


module.exports.createAdmin = async (req, res) => {
    try{
        let owners = await ownerModel.find();
        if(owners.length >= 5){
            return res.status(503).send("you don't have permission to create a new admin");
        }
        let {fullname, email, password} = req.body;
    
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async(err, hash) => {
                if(err) return res.send(err.message);
                
                let admin = await ownerModel.create({
                    fullname,
                    email,
                    password : hash,
                })

                //ye admin ka data leke ek key genrate karega, that we'll use in identifing admin, aur fir cookies me "asmin_token" name ke var me token save kar dega
                let token = generateToken(admin); 
                res.cookie("admin_token", token);

                res.status(201).send(admin);
            })
        })

    } catch(err){
        res.send("Something went wrong");
    }
};


module.exports.renderLoginFrom = (req, res) => {
    res.render("adminLogin.ejs"); //bcs we will work with this logic
}


module.exports.adminLogin = async function(req, res){
    try{
        let {email, password} = req.body;
        let admin = await ownerModel.findOne({email: email});
        
        if(!admin){
            req.flash("error", "admin doese not exists");
            return res.redirect("/admin/login");
        }

        //password is "admin input password" and "admin.password" is hashed password
        bcrypt.compare( password, admin.password, (err, result) => { //res is boolean value
            if(result){
                let token = generateToken(admin); //genrate ne token for admin
                res.cookie("admin_token", token); //set token in cookies
            
                req.flash("success", "successfully login");
                res.redirect("/admin/adminDashboard");
            } else{
                req.flash("error", "please enter correct password");
                res.redirect("/admin/login");
            }
        })
    } catch(err) {
        req.flash("error", "Something went wrong during login");
        res.redirect("/admin/login");
    }
    
}


module.exports.logoutAdmin = async (req, res) => {
    res.cookie("admin_token", "");
    res.redirect("/admin/login");
}


module.exports.showAdminPannel = async (req, res) => {
    let adminProduct = req.admin.product; //this is all product id in admin model
    //console.log(adminProduct);

    let products = await productModel.find({
        _id: { $in: adminProduct}
    });
    res.render("adminDashboard", {products, isAdminLoggedin: true});
}


module.exports.createProduct = (req, res) => {
    res.render("create", {isAdminLoggedin: true});
}


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params; // product id
    //console.log(id);

    let product = await productModel.findById(id);
    res.render("adminProductEdit", {product, isAdminLoggedin: true});
}


module.exports.deleteProduct = async (req, res) => {
    try{
        let { id } = req.params; // this is product id
        //console.log(id);

        //sabhi user ke cart se product id remove
        await userModel.updateMany(
            {}, //in all users
            { $pull: { cart: id } }, //remove product id from every user
        )

        await ownerModel.findOneAndUpdate(
            { _id: req.admin._id }, //this come from isAdmin midd, is id se owner mil jayega
            { $pull: { product: id } }, //remove product id in admins product array 
        )

        let deletedProduct = await productModel.findByIdAndDelete(id); //now delete product

        if (!deletedProduct) {
            req.flash("error", "Product not found or already deleted.");
            return res.redirect("/admin/adminDashboard"); //for correct flash msg
        }

        req.flash("success", "Product deleted successfully");
        return res.redirect("/admin/adminDashboard");

    } catch(err) {
        req.flash("error", "Delete failed: We couldn't delete your item. Try again.");
        res.redirect("/admin/adminDashboard");
    }
}


module.exports.deleteAllProduct = async (req, res) => {
    try{
        let adminProduct = req.admin.product; // this is admin's product array
        //console.log(adminProduct);

        if(!adminProduct || adminProduct.length == 0){
            req.flash("error", "No products to delete");
            return res.redirect("/admin/adminDashboard");
        };

        await productModel.deleteMany({ //product collection me se sare product delete kardo
            _id: { $in: adminProduct}
        });

        //sabhi user ke cart me se product hata do
        await userModel.updateMany(
            {}, // sabhi user ke
            { $pull: { cart: { $in: adminProduct } } }, //cart me se adminProduct remove kardo
        )        

        //owner me se product id hatao
        let owner = await ownerModel.findOneAndUpdate(
            { _id: req.admin._id },
            { $set: { product: [] } },
        )
        //console.log(owner);
        
        req.flash("success", "All products are deleted successfully");
        res.redirect("/admin/adminDashboard");
        
    } catch(err) {
        req.flash("error", "Delete failed: We couldn't delete your items. Try again.")
        res.redirect("admin/adminDashboard");
    }
}