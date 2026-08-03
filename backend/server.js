import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const app= express();
app.use(cors());
app.use(express.json());

app.listen(process.env.server_port, ()=>{
    console.log(`Server is running on port ${process.env.server_port}`);
})


const dbConnection = mysql.createPool({
    host: process.env.db_host,
    user: process.env.root,
    password: process.env.password,
    database: process.env.abe_garage,

    queueLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    connectionLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

// Test the database connection
dbConnection.getConnection()
    .then(connection => {
        console.log("Database connection established successfully.");
        connection.release();
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });
    
