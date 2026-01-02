const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const productModel = require("../models/productModel");


module.exports.createAdmin = async (req, res) => {
    try{
        let owners = await ownerModel.find();
        if(owners.length >= 3){
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

//login form do
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
    let products = await productModel.find();
    res.render("adminDashboard", {products, isAdminLoggedin: true});
}

module.exports.createProduct = (req, res) => {
    res.render("create");
}

