const e = require('express');
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

module.exports = {
    getUndoneOrders,
    updateOrderStatus
};