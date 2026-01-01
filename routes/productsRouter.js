const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdmin");

router
    .route("/create")
    .post(upload.single("image"), isAdmin, productController.productCreate);

module.exports = router;