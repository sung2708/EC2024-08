const db = require('../utils/db');

// Lấy danh sách hóa đơn chưa hoàn thành
const getUndoneOrders = async () => {
    const [rows] = await db.query('SELECT * FROM orders WHERE status = "undone"');
    return rows;
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (id, status) => {
    const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return result;
};

// Lấy doanh thu theo tháng
const getMonthlyRevenue = async (year, month) => {
    const [rows] = await db.query(
        `SELECT SUM(total_amount) AS revenue 
         FROM orders 
         WHERE status = 'completed' 
           AND YEAR(order_date) = ? 
           AND MONTH(order_date) = ?`,
        [year, month]
    );
    return rows[0]; 
};

// Tạo mới một order
const createOrder = async (userId, status, totalAmount) => {
    const [result] = await pool.query(
        `INSERT INTO orders (user_id, status, total_amount) VALUES (?, ?, ?)`,
        [userId, status, totalAmount]
    );
    return result.insertId;
};

// Tính tổng số tiền cho một order
const calculateTotalAmount = async (orderId) => {
    const [rows] = await pool.query(
        `SELECT SUM(price * quantity) as totalAmount FROM order_items WHERE order_id = ?`,
        [orderId]
    );
    return rows[0].totalAmount;
};

// Tạo mới một order item
const createOrderItem = async (orderId, productId, quantity, price) => {
    const [result] = await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, productId, quantity, price]
    );
    return result.insertId;
};


module.exports = {
    getUndoneOrders,
    updateOrderStatus,
    getMonthlyRevenue,
    createOrder,
    calculateTotalAmount,
    createOrderItem,
};
