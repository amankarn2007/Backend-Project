module.exports.wrapAsync = function(func){
    return function(req, res,next){
        func(req, res, next).catch((err) => {
            next(err);
        })
    }
}

//isme aaye func me se error catch karke "next()" ke through "global error handler" ko bej do