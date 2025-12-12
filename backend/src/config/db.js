import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_Name,
  port: process.env.XAMMPP_PORT
});

db.connect((err) => {
  if (err) {
    console.log("ERROR connecting to DB:", err);
    return;
  }
  console.log("Database Connected successfully");
});

export default db;
