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


router
    .route("/create")
    .get(isAdmin , productController.createProduct)

router
    .route("/editProduct/:id")
    .get(isAdmin, wrapAsync(productController.renderEditForm));

router
    .route("/deleteProduct/:id")
    .delete(isAdmin, wrapAsync(productController.deleteProduct));

router
    .route("/deleteAllProduct") //isme hamne id nahi bheja kyoki sabhi delete karna hai //❌
    .get(isAdmin, productController.deleteAllProduct)



module.exports = router;