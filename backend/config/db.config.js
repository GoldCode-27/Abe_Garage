import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
export const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    // port: process.env.db_port || 3306, // Points to MySQL port 3306
    connectionLimit: 10,
});
  
// Prepare a function that will execute the SQL queries asynchronously
export async function query(sql, data) {
  const [rows, fields] = await pool.execute(sql, data);
  return rows;
}

// query();
export default pool;