const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

    
router
    .route("/register")
    .post(userController.registerUser); // "/register" ka post req handler


router
    .route("/login")
    .post(userController.loginUser); // "/login" ka post req handler


router
    .route("/logout")
    .get(userController.logoutUser);

module.exports = router;