const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const indexController = require("../controllers/indexController");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router
    .route("/")
    .get(indexController.home);


router
    .route("/cart")
    .get(isLoggedin, indexController.showCart);


router
    .route("/addtocart/:id")
    .get(isLoggedin, indexController.addToCart);


router
    .route("/remove-from-cart/:id")
    .get(isLoggedin, indexController.removeFromCart);

module.exports = router;