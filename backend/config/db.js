const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // important for TiDB (4000)
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 🔴 CRITICAL FIX FOR TIDB CLOUD (SSL REQUIRED)
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ TiDB MySQL connected successfully (SSL Enabled)');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL/TiDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { pool, testConnection };