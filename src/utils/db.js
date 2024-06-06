const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EC2024_08'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});


module.exports = db;