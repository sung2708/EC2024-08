const orderModel = require('../models/order.model');
const db = require('../utils/db');

const getUndoneOrders = async (req, res) => {
    try {
        const { staffId } = req.body;

        const [rows] = await db.query(`
            SELECT o.id, o.order_date, o.status, o.total_amount
            FROM orders o
            JOIN production p ON o.id = p.order_id
            WHERE p.assigned_to = ? AND o.status = 'undone'
            GROUP BY o.id
        `, [staffId]);

        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        const result = await orderModel.updateOrderStatus(id, status);
        res.json({ message: 'Order status updated successfully', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lây doanh thu theo tháng
const getMonthlyRevenue = async (req, res) => {
    try {
        const { year, month } = req.query;
        const monthNum = parseInt(month, 10);
        const revenue = await orderModel.getMonthlyRevenue(year, monthNum);
        res.json(revenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Thêm mới hóa đơn và các sản phẩm liên quan
const addOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Tạo một đơn hàng mới với tổng tiền ban đầu là 0
        const orderId = await orderModel.createOrder(userId, 'Pending', 0);

        // Thêm từng sản phẩm vào order_items
        for (const item of items) {
            await orderModel.createOrderItem(orderId, item.productId, item.quantity, item.price);
        }

        // Tính tổng tiền cho đơn hàng
        const totalAmount = await orderModel.calculateTotalAmount(orderId);

        // Cập nhật tổng tiền vào đơn hàng
        await pool.query(
            `UPDATE orders SET total_amount = ? WHERE id = ?`,
            [totalAmount, orderId]
        );

        res.status(201).json({
            message: 'Order created successfully',
            orderId: orderId,
        });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({
            message: 'Failed to add order',
            error: error.message,
        });
    }
};

module.exports = {
    getUndoneOrders,
    updateOrderStatus,
    getMonthlyRevenue,
    addOrder,
};