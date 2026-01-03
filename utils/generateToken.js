const jwt = require("jsonwebtoken");

//genrateRoken me ham user ya admin ko bhejenge, aur ye email aur userId se token gerate karega
const generateToken = function(user){
    return jwt.sign(
        {email: user.email, id: user._id},
        process.env.JWT_KEY,
        {expiresIn: "7d"},
    );
}
// {expiresIn: "7d"} applies jwt token expiry date, that secure our token

module.exports.generateToken = generateToken;