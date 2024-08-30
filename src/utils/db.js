const mysql = require('mysql2/promise');

// Tạo kết nối pool với MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '8261935aA@2812',
    database: 'ec2024',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
