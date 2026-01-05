const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.");

module.exports = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return next(new ExpressError(400, "Invalid Product ID Formate!."));
    }

    next();
}