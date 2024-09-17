const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel")

async function uploadProductController(req, res) {

    try{

        const sessionUserId = req.userId;

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new productModel(req.body);
        const saveProduct = uploadProduct.save();

        res.status(200).json({
            message: "product created successfully",
            data : saveProduct,
            error: false,
            success: true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = uploadProductController;