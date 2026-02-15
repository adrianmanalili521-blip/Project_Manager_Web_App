require('dotenv').config();
const mysql = require('mysql2/promise');

async function test() {
  try {
    const db = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await db.query("SELECT COUNT(*) AS totalProjects FROM projects");
    console.log("MySQL connection works! Total projects:", rows[0].totalProjects);

    process.exit(0);
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

test();
