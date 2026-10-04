import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import pool from'./config/db.config.js';
import router from'./routes/index.js';

const app= express();
app.use(cors());
app.use(express.json()); 
app.use(router);

const PORT=process.env.PORT;

const StartServer = async ()=>{

const connection = await pool.getConnection();

console.log("DB connected successfully.");
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
 })
}
StartServer();



  


  
