const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

//Set NODE_ENV === "development"
if(process.env.NODE_ENV === "development"){
    router.post("/createAdmin", adminController.createAdmin);
}

router
    .route("/create")
    .get(isAdmin , adminController.createProduct)

router
    .route("/editProduct/:id")
    .get(isAdmin, adminController.renderEditForm)

router
    .route("/deleteProduct/:id")
    .delete(isAdmin, adminController.deleteProduct);

router
    .route("/deleteAllProduct")
    .get(isAdmin, adminController.deleteAllProduct)

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