require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const port = 3001

//For displaying
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/assets')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
