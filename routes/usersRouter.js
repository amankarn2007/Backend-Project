const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

    
router
    .route("/register")
    .get(userController.getRegisterForm)
    .post(userController.registerUser); // "/register" ka post req handler


router
    .route("/login")
    .get(userController.renderLoginForm) //
    .post(userController.loginUser); // "/login" ka post req handler


router
    .route("/adminDashboard")
    .get(userController.showAdminDash);


router
    .route("/logout")
    .get(userController.logoutUser);

module.exports = router;