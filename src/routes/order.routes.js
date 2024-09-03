const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const userMiddleware = require('../middlewares/user.middleware');
const cors = require('cors');

const corsOptions = {
    origin: [
        'https://ec-2024-08-fe.vercel.app',
        'http://localhost:3000'
    ],
    optionsSuccessStatus: 200
}

router.use(cors(corsOptions));

// Route để lấy danh sách hóa đơn chưa hoàn thành
router.post('/undone', orderController.getUndoneOrders);

// Route để cập nhật trạng thái đơn hàng
router.put('/update-status/:id', orderController.updateOrderStatus);

// Route để thêm mới hóa đơn
router.post('/add-orders', userMiddleware.authenticate, orderController.addOrder);


module.exports = router;
