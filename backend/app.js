const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

// Middleware Imports
const errorMiddleware = require('./middleware/error');

// express app using json
app.use(express.json());

// express app using cookie-parser
app.use(cookieParser());


// Routes Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

// Assigning Routes
app.use("/api", product);
app.use("/api", user);
app.use("/api", order);

// MiddleWare for Error
app.use(errorMiddleware);









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