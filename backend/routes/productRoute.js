const express = require('express');


// Product Controller Exports Functions
const { getAllProducts } = require('../controllers/productController');

// Router Definition
const router = express.Router();

// Routes
router.route("/products").get(getAllProducts);

const homePage=(req, res)=> {
    res.render("hello world")
}

router.route("/").get(homePage);

// Exporting router module
module.exports = router;

