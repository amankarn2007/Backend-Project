const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");

let getRegisterForm = function(req, res){
    res.render("auth", { loggedin: false });
}

let registerUser = async function(req, res){
    try{
        let {email, fullname, password} = req.body;
    
        let user = await userModel.findOne({email: email});
        if(user){
            req.flash("error", "User already exists");
            return res.redirect("/users/register");
        }

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async(err, hash) => {
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        fullname,
                        password : hash,
                    })

                    let token = generateToken(user); //
                    res.cookie("token", token); //set token in cookies

                    req.flash("success", "User created successfully");
                    res.redirect("/");
                }
            })
        })

    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/users/register");
    }
}

let renderLoginForm = function(req, res){
    res.render("auth", { loggedin: false });
}

let loginUser = async function(req, res){
    try{
        let {email, password} = req.body;

        let user = await userModel.findOne({email: email});
        if(!user){
            req.flash("error", "user doese not exists");
            return res.redirect("/users/login");
        }

        //password is "user input password" and "user.password" is hashed password
        bcrypt.compare( password, user.password, (err, result) => { //res will boolean value
            if(result){
                let token = generateToken(user);
                res.cookie("token", token);

                req.flash("success", "successfully login");
                res.redirect("/");
            } else{
                req.flash("error", "please enter correct password");
                res.redirect("/users/login");
            }
        })
    } catch(err) {
        req.flash("error", "err.message");
        res.redirect("/users/login");
    }
    
}

let showAdminDash = function(req, res){
    res.render("adminDashboard");
}

let logoutUser = async function(req, res){
    res.cookie("token", "");
    res.redirect("/users/login");
}

module.exports = {
    getRegisterForm,
    registerUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    showAdminDash,
}