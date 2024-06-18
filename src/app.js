const express = require('express');
const app = express();
const path = require('path');
const port = 3001;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/assets')));

app.get('/', (req, res) => {
    res.send("Fuck!");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
