const { ProductSchema } = require("../schema")
const ExpressError = require("../utils/ExpressError.");

module.exports.validateProduct = (req, res, next) => {
    let { error } = ProductSchema.validate(req.body);

    if(error){
        throw next(new ExpressError(400, "GIVE VALID DATA!"));
    }

    next();
}