const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");
const { wrapAsync } = require("../utils/wrapAsync");

//Set NODE_ENV === "development"
if(process.env.NODE_ENV === "development"){
    router.post("/createAdmin", adminController.createAdmin);
}

router
    .route("/create")
    .get(isAdmin , adminController.createProduct)

router
    .route("/editProduct/:id")
    .get(isAdmin, wrapAsync(adminController.renderEditForm));

router
    .route("/deleteProduct/:id")
    .delete(isAdmin, wrapAsync(adminController.deleteProduct));

router
    .route("/deleteAllProduct") //isme hamne id nahi bheja kyoki sabhi delete karna hai
    .get(isAdmin, adminController.deleteAllProduct)

router
    .route("/login")
    .get(adminController.renderLoginFrom)
    .post(wrapAsync(adminController.adminLogin));
router
    .route("/logout")
    .get(adminController.logoutAdmin)

router
    .route("/adminDashboard")
    .get(isAdmin, wrapAsync(adminController.showAdminPannel));


module.exports = router;