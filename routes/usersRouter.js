const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const wrapAsync = require("../utils/wrapAsync");
    
router
    .route("/register")
    .get(userController.getRegisterForm)
    .post(userController.registerUser); // "/register" ka post req handler


router
    .route("/login")
    .get(userController.renderLoginForm) //
    .post(wrapAsync(userController.loginUser)); // "/login" ka post req handler


router
    .route("/logout")
    .get(userController.logoutUser);

module.exports = router;