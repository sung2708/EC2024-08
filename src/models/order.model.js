const db = require('../utils/db');

const getUndoneOrders = async () => {
    const [rows] = await db.query('SELECT * FROM orders WHERE status = "undone"');
    return rows;
};

const updateOrderStatus = async (id, status) => {
    const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return result;
};

module.exports = {
    getUndoneOrders,
    updateOrderStatus
};
