const app = require('./app');

const dotenv = require('dotenv');

// Handling Uncaught Exception -- Eg: error occur due to calling undefined variables,functions, etc 
process.on("uncaughtException", (err)=> {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Uncaught Exception`);
    process.exit(1);
});

// dotenv config
dotenv.config({path: "backend/config/config.env"});

// Database Imports
const connectDatabase = require('./config/dbconfig');
connectDatabase();



const server = app.listen(process.env.PORT, (req, res)=> {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});

// Unhandled Promise Rejection Error Handling -- Eg: Invalid Credentials: such as (Invalid DB connection String), etc... 
process.on("unhandledRejection", (err)=> {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
    server.close(()=> {
        process.exit(1)
    })
})
