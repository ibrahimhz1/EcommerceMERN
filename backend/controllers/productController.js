// Product Model Import
const Product = require('../models/productModel');

// ErrorHandler Utility Import
const ErrorHandler = require('../utils/errorHandler');

// CatchAsyncErrors Middleware Import
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
})

// Get Single Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product not found"
    //     })
    // }

    // Using Error Middleware
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(201).json({
        success: true,
        product
    })
})

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product not found"
    //     })
    // }

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        updatedProduct
    });
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product not found so cannot be deleted"
    //     })
    // }

    if (!product) {
        return next(new ErrorHandler("Product not found so cannot be deleted", 404));
    }

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

