const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const indexController = require("../controllers/indexController");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const validateProductId = require("../middlewares/validateProductId");

router
    .route("/")
    .get(wrapAsync(indexController.home));

    
router
    .route("/cart")
    .get(isLoggedin, wrapAsync(indexController.showCart));


router
    .route("/addtocart/:id")
    .get(isLoggedin, validateProductId, wrapAsync(indexController.addToCart));


router
    .route("/remove-from-cart/:id")
    .get(isLoggedin, validateProductId, wrapAsync(indexController.removeFromCart));

module.exports = router;