const { UserSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError.");

module.exports.validateUser = (req, res, next) => {
    let { error } = UserSchema.validate(req.body);
    if(error){
        throw next(new ExpressError(400, error));
    } else {
        next();
    }
}