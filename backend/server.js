const app = require('./app');

const dotenv = require('dotenv');

// dotenv config
dotenv.config({path: "backend/config/config.env"});



















app.listen(process.env.PORT, (req, res)=> {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});