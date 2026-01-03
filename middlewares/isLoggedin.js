const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
    let { token } = req.cookies
    if(!token){
        req.flash("error", "you need to login first");
        return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select("-password");

        req.user = user;
        next();

    } catch(err){
        req.flash("error", "something went wrong.");
        res.clearCookie("cookie");
        res.redirect("/");
    }
}