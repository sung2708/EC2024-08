const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');

app.use(express.json());
app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
