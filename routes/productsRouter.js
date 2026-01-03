const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdmin");
const { wrapAsync } = require("../utils/wrapAsync");

router
    .route("/create")
    .get(isAdmin , productController.renderCreateForm)
    .post(upload.single("image"), isAdmin, wrapAsync(productController.productCreate));


router
    .route("/editProduct/:id")
    .get(isAdmin, wrapAsync(productController.renderEditForm))
    .put(upload.single("image"), isAdmin, productController.editProduct);

    
router
    .route("/deleteProduct/:id")
    .delete(isAdmin, wrapAsync(productController.deleteProduct));


router
    .route("/deleteAllProduct") //isme hamne id nahi bheja kyoki sabhi delete karna hai
    .delete(isAdmin, wrapAsync(productController.deleteAllProduct));

module.exports = router;