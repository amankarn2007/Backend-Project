class ExpressError extends Error{
    constructor( statusCode, message ){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;

//ExpressError statusCode, message aur message set karta hai, jo ise bheja gya tha.