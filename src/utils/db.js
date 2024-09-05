// Load environment variables from .env file
require('dotenv').config();

const mysql = require('mysql2/promise');

// Tạo kết nối pool với MySQL
const pool = mysql.createPool({
    host: "127.0.0.1",//process.env.DB_HOST,
    user: "root",//process.env.DB_USER,
    password: "8261935aA@2812",//process.env.DB_PASSWORD,
    database: "ec2024",//process.env.DB_NAME,
    port: 3306
    // waitForConnections: true,
    // connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 10,
    // queueLimit: process.env.DB_QUEUE_LIMIT ? parseInt(process.env.DB_QUEUE_LIMIT) : 0
});

module.exports = pool;
