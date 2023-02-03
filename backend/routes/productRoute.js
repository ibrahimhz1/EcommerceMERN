const express = require('express');


// Product Controller Exports Functions
const { getAllProducts } = require('../controllers/productController');

// Router Definition
const router = express.Router();

// Routes
router.route("/products").get(getAllProducts);















// Exporting router module
module.exports = router;