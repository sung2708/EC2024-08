const express = require('express');
const mysql = require('mysql')
const path = require('path');
const app = express()
const port = 3001;

const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQLPASSWORD,
    database: 'EC2024'
});

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/assets')));

const query = promisify(pool.query).bind(pool);

app.get('/item', async (req, res) => {
    try {
        const [rows] = await query('SELECT * FROM ITEM');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
