const express = require('express');

// Product Controller Exports Functions
const { getProductDetails, getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Router Definition
const router = express.Router();

// Routes
router.route("/products").get(getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").get(getProductDetails).put(updateProduct).delete(deleteProduct)


// Exporting router module
module.exports = router;