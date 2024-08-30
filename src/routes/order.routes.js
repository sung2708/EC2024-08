const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const userMiddleware = require('../middlewares/user.middleware');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

router.use(cors(corsOptions));

// Route để lấy danh sách hóa đơn chưa hoàn thành
router.post('/undone', orderController.getUndoneOrders);

// Route để cập nhật trạng thái đơn hàng
router.put('/update-status/:id', orderController.updateOrderStatus);

// Route để lấy doanh thu theo tháng
router.get('/admin/revenue',
    userMiddleware.authenticate, 
    userMiddleware.authorize(['admin']), 
    orderController.getMonthlyRevenue
);

module.exports = router;
