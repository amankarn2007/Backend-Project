const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");

module.exports.productCreate = async (req, res) => {
    //try{
        let {name, price, discount, bgcolor, pannelcolor, textcolor} = req.body;

        let adminId = req.admin._id;
        //console.log(req.admin._id);

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
    //} catch(err) {
    //    req.flash("error", "currently can't make product");
    //    res.redirect("/admin/adminDashboard");
    //}
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
        req.flash("error", "Somwthing went wrong");
        res.redirect("/admin/adminDashboard");
    }
}