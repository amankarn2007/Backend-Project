const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

//Set NODE_ENV === "development"
if(process.env.NODE_ENV === "development"){
    router.post("/create", adminController.createAdmin);
}

router
    .route("/create")
    .get( adminController.createProduct)


router
    .route("/login")
    .get(adminController.renderLoginFrom)
    .post(adminController.adminLogin)

router
    .route("/logout")
    .get(adminController.logoutAdmin)

router
    .route("/adminDashboard")
    .get(isAdmin, adminController.showAdminPannel);


module.exports = router;