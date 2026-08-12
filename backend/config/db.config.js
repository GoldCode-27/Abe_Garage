
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


//create connection pool
const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    port: process.env.server_port,

    connectionLimit: 10,

})

const dbAccess= pool.promise();

//start connection
pool.getConnection((err, connection) => {
    if(err){
        throw err;
    } 
    console.log("database connected successfully");
})

export default dbAccess;