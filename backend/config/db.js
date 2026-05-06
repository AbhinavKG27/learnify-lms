const mysql = require("mysql2/promise");
require("dotenv").config();

// Detect environment
const isProduction = process.env.NODE_ENV === "production";
const isLocalhost =
  process.env.DB_HOST === "localhost" ||
  process.env.DB_HOST === "127.0.0.1";

// Decide if SSL is needed
const useSSL = isProduction && !isLocalhost;

// Build config
const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Apply SSL ONLY if needed (TiDB / Cloud)
if (useSSL) {
  dbConfig.ssl = {
    minVersion: "TLSv1.2",
    rejectUnauthorized: false, // prevents certificate chain error
  };
}

// Create pool
const pool = mysql.createPool(dbConfig);

// Test connection
const testConnection = async () => {
  try {
    const conn = await pool.getConnection();

    console.log(
      `✅ DB Connected → ${useSSL ? "Cloud (SSL Enabled)" : "Local (No SSL)"}`
    );

    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error(err.message);

    // Helpful debugging logs
    console.log("🔍 Debug Info:");
    console.log("HOST:", process.env.DB_HOST);
    console.log("PORT:", process.env.DB_PORT);
    console.log("SSL Enabled:", useSSL);

    process.exit(1);
  }
};

module.exports = { pool, testConnection };