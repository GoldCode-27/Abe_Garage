import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dbAccess from'../backend/config/db.config'

const app= express();
app.use(cors());
app.use(express.json()); 

app.listen(process.env.server_port, ()=>{
    console.log(`Server is running on port ${process.env.server_port}`);
})




  


  
