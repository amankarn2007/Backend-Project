const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const ownerController = require("../controllers/ownerController");
const isAdmin = require("../middlewares/isAdmin");


//Set NODE_ENV === "development"
if(process.env.NODE_ENV === "development"){
    router.post("/create", ownerController.createAdmin);
}

router
    .route("/admin/create")
    .get(isAdmin, ownerController.createProduct)


router
    .route("/admin/login")
    .get(ownerController.renderLoginFrom)
    .post(ownerController.adminLogin)

router
    .route("/admin/logout")
    .get(ownerController.logoutAdmin)

module.exports = router;