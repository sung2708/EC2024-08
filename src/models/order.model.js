const db = require('../utils/db');

const getUndoneOrders = async () => {
    const [rows] = await db.query('SELECT * FROM orders WHERE status = "undone"');
    return rows;
};

const updateOrderStatus = async (id, status) => {
    const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return result;
};


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

module.exports = {
    getUndoneOrders,
    updateOrderStatus,
    getMonthlyRevenue
};
