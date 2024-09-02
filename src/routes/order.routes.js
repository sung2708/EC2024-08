const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Route để lấy danh sách hóa đơn chưa hoàn thành
router.post('/undone', orderController.getUndoneOrders);

// Route để cập nhật trạng thái đơn hàng
router.put('/update-status/:id', orderController.updateOrderStatus);

// Route để thêm mới hóa đơn
router.post('/add-orders', orderController.addOrder);

module.exports = router;
