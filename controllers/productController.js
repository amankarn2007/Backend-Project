const userModel = require("../models/userModel");
const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");

module.exports.renderCreateForm = (req, res) => {
    res.render("create", {isAdminLoggedin: true});
}

module.exports.productCreate = async (req, res) => {
    let {name, price, discount, bgcolor, pannelcolor, textcolor} = req.body;

    let adminId = req.admin._id;
    //console.log(req.admin._id);

    //if(req.file){
    //    console.log(req.file);
    //}

    let product = await productModel.create({
        image: req.file.buffer,
        owner: adminId,
        name,
        price,
        discount,
        bgcolor,
        pannelcolor,
        textcolor,
    });
        
    //owner me product ka aur product me owner ka id dena padega
    let owner = await ownerModel.findById(adminId);
    owner.product.push(product._id);
    await owner.save();

    req.flash("success", "Product created successfully");
    res.redirect("/admin/adminDashboard");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params; // product id
    //console.log(id);

    let product = await productModel.findById(id);
    res.render("adminProductEdit", {product, isAdminLoggedin: true});
}

module.exports.editProduct = async (req, res) => {
    try{
        let { id } = req.params; //product id
        //console.log(req.body);
        let { name, price, discount, bgcolor, pannelcolor, textcolor } = req.body;

        let product = { name, price, discount, bgcolor, pannelcolor, textcolor };

        //console.log(product);

        if(req.file){ // agar img upload hua hai
            product.image = req.file.buffer;
        }

        await productModel.findByIdAndUpdate(id, product);

        req.flash("success", "product successfully updated");
        res.redirect("/admin/adminDashboard");

    } catch(err) {
        req.flash("error", "Can't update product");
        res.redirect("/admin/adminDashboard");
    }
}

module.exports.deleteProduct = async (req, res) => {
    try{
        let { id } = req.params; // this is product id
        //console.log(id);

        //sabhi user ke cart se product id remove
        await userModel.updateMany(
            {}, //in all users
            { $pull: { cart: id } }, //remove product id from every user
        )

        await ownerModel.findOneAndUpdate(
            { _id: req.admin._id }, //this come from isAdmin midd, is id se owner mil jayega
            { $pull: { product: id } }, //remove product id in admins product array 
        )

        let deletedProduct = await productModel.findByIdAndDelete(id); //now delete product

        if (!deletedProduct) {
            req.flash("error", "Product not found or already deleted.");
            return res.redirect("/admin/adminDashboard"); //for correct flash msg
        }

        req.flash("success", "Product deleted successfully");
        return res.redirect("/admin/adminDashboard");

    } catch(err) {
        req.flash("error", "Delete failed: We couldn't delete your item. Try again.");
        res.redirect("/admin/adminDashboard");
    }
}

module.exports.deleteAllProduct = async (req, res) => {
    try{
        let adminProduct = req.admin.product; // this is admin's product array
        //console.log(adminProduct);

        if(!adminProduct || adminProduct.length == 0){
            req.flash("error", "No products to delete");
            return res.redirect("/admin/adminDashboard");
        };

        //sabhi user ke cart me se product hata do
        await userModel.updateMany(
            {}, // sabhi user ke
            { $pull: { cart: { $in: adminProduct } } }, //cart me se adminProduct remove kardo
        )        

        //owner me se product id hatao
        await ownerModel.findOneAndUpdate(
            { _id: req.admin._id },
            { $set: { product: [] } },
        )

        await productModel.deleteMany({ //product collection me se sare product delete kardo
            _id: { $in: adminProduct}
        });
        
        req.flash("success", "All products are deleted successfully");
        res.redirect("/admin/adminDashboard");
        
    } catch(err) {
        req.flash("error", "Delete failed: We couldn't delete your items. Try again.")
        res.redirect("admin/adminDashboard");
    }
}