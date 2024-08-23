const Pool = require('pg').Pool

const pool = new Pool({
    host: '',
    user: 'postgre',
    password: process.env.MYSQLPASSWORD,
    database: 'EC2024',
    port: 5432
});

pool.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});


module.exports = pool;