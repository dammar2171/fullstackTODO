import pg from "pg";
import dotenv from "dotenv";
const {Pool} = pg;
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_Name,
  port: process.env.POSTGRES_PORT
});

pool.connect((err) => {
  if (err) {
    console.log("ERROR connecting to DB:", err);
    return;
  }
  console.log("Database Connected successfully");
});

export default pool;
