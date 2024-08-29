const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./middlewares/error.middleware');

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/products', productRoutes);

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
