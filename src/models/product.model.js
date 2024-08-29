// models/product.model.js
const pool = require('../utils/db');

const getAllProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

module.exports = {
    getAllProducts,
};
