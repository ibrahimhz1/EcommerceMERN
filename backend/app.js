const express = require('express');
const app = express();






// Sample Routes for testing purpose
app.get("/", (req, res)=> {
    res.status(200).send("<h1>hello world from Express App Ecommerce App</h1>");
});
app.get("/about", (req, res)=> {
    res.status(200).send("<h1>This is About page</h1>");
});
app.get("/contact", (req, res)=> {
    res.status(200).send("<h1>This is Contact page</h1>");
});
app.get("*", (req, res)=> {
    res.status(500).send("<h1>Error page : U visited the wrong endpoint</h1>")
});






module.exports = app;