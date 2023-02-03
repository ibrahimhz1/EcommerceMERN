const Product = require('../models/productModel');


// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All Products
exports.getAllProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
}

// Get Single Product Details
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    else {
        res.status(201).json({
            success: true,
            product
        })
    }
}

// Update Product
exports.updateProduct = async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        });
    }
    else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            product
        });
    }
}

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found so cannot be deleted"
        })
    }
    else {
        await product.deleteOne();
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        })
    }

}

