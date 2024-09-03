const e = require('express');
const orderModel = require('../models/order.model');
const db = require('../utils/db');

const getUndoneOrders = async (req, res) => {
    try {
        const { staffId } = req.body;

        const [rows] = await db.query(`
            SELECT o.id, o.order_date, o.status, o.total_amount, p.product_id, p.quantity, p.price, pr.name
            FROM orders o
            JOIN order_items p ON o.id = p.order_id
            JOIN products pr ON pr.id = p.product_id
            WHERE o.status = 'pending'
        `, [staffId]);
        const result = rows.reduce((acc, it) => {
            if(acc[it.id])
            {
                acc[it.id].items.push(it);
            }
            else
            {
                const shipDate = new Date(it.order_date);
                shipDate.setDate(shipDate.getDate() + 3);
                acc[it.id] = {
                    items: [it],
                    id: it.id,
                    date: new Date(it.order_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    amount: it.total_amount.split('.')[0],
                    shipDate: shipDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                };
            }
            return acc;
        }, {}); //reduce items to array of order contain child order items

        res.json(result);
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
    const { items } = req.body;
    const userId = req.user?.userId; // Lấy userId từ JWT token đã được xác thực

    console.log('Authenticated userId:', userId); // Ghi log để kiểm tra giá trị userId

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    let conn;
    try {
        // Bắt đầu transaction
        conn = await db.getConnection();
        await conn.beginTransaction();

        // Tính tổng số tiền
        const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Tạo đơn hàng trong bảng `orders`
        const [orderResult] = await conn.query(
            'INSERT INTO orders (user_id, status, total_amount) VALUES (?, ?, ?)',
            [userId, 'pending', totalAmount]
        );

        const orderId = orderResult.insertId;

        // Thêm các sản phẩm vào bảng `order_items`
        for (const item of items) {
            await conn.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, item.price]
            );
        }

        // Cập nhật số lượng sản phẩm trong bảng `inventory`
        for (const item of items) {
            await conn.query(
                'UPDATE inventory SET quantity = quantity - ? WHERE product_id = ?',
                [item.quantity, item.productId]
            );
        }

        // Hoàn tất transaction
        await conn.commit();
        conn.release();

        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        if (conn) {
            await conn.rollback();
            conn.release();
        }
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};


module.exports = {
    getUndoneOrders,
    updateOrderStatus,
    getMonthlyRevenue,
    addOrder,
};