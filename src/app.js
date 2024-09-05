const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/user', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
