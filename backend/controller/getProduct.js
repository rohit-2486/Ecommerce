const productModel = require("../models/productModel")

const getProductController = async(req , res) =>{
    try{
        const allProduct = await productModel.find().sort({createdBy : -1})

        res.status(200).json({
            message: 'all Product',
            error: false,
            success: true,
            data: allProduct,
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }    

}

module.exports = getProductController;