const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
require("./config/mongooseConnection.js"); //Database connection, no need to store in any var
const ejsMate = require("ejs-mate");
const expressSession = require("express-session");
const flash = require("connect-flash");

const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const indexRouter = require("./routes/index.js");

require("dotenv").config(); //to access .env Keys using process.env.__

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);

app.use( //flash use karne ke liye sesion lagana padta hai
    expressSession({
        resave: false,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET || "anything",
        cookie : {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false
        }
    })
);

app.use(flash());

app.use((req,res,next) => { // show success/error using flash
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//app.get("/", (req, res) => {
//    res.send("hey...");
//});

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(8080, () => {
    console.log("server is listening on port 8080");
})