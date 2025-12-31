const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productController = require("../controllers/productController");

router
    .route("/create")
    .post(upload.single("image"), productController.productCreate);
    

module.exports = router;