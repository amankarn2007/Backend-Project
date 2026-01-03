const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdmin");
const { wrapAsync } = require("../utils/wrapAsync");

router
    .route("/create")
    .post(upload.single("image"), isAdmin, wrapAsync(productController.productCreate));


router
    .route("/edit/:id")
    .put(upload.single("image"), isAdmin, productController.editProduct);

module.exports = router;