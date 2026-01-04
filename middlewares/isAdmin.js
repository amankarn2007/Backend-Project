const jwt = require("jsonwebtoken");
const ownerModel = require("../models/ownerModel");

module.exports = async (req, res, next) => {
    const token = req.cookies.admin_token; //this is admin's token

    if(!token){
        req.flash("error", "you need to login first");
        return res.redirect("/admin/login");
    }

    try{
        let decoded = jwt.verify(token, process.env.JWT_KEY); //verify token

        let admin = await ownerModel.findOne({ email: decoded.email }).select("-password");
        if(!admin){
            req.flash("error", "Invalid admin session");
            return res.redirect("/admin/login");
        }

        req.admin = admin; //attach admin in request object
        next();

    } catch(err){
        req.flash("error", "something went wrong.");
        res.clearCookie("admin_token"); //remove wrong token
        return res.redirect("/admin/login");
    }
}