const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 150,
  queueLimit: 0,
  connectTimeout: 5000,
});

pool.on('error', (err) => {
    console.log('Error connecting to db', err);
});

module.exports = pool;
