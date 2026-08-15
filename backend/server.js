import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import pool from'./config/db.config.js'

const app= express();
app.use(cors());
app.use(express.json()); 

const PORT=process.env.port;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})




  


  
