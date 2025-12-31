const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const indexController = require("../controllers/indexController");
const router = express.Router();

router
    .route("/")
    .get(indexController.home);


router
    .route("/shop")
    .get(isLoggedin, indexController.showShop);


router
    .route("/cart")
    .get(isLoggedin, indexController.showCart);


router
    .route("/addtocart/:id")
    .get(isLoggedin, indexController.addToCart);


module.exports = router;