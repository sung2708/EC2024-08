// controllers/product.controller.js
const Product = require('../models/product.model');

// Nhóm sản phẩm theo giá
const getProductsGroupedByPrice = async (req, res) => {
    try {
        const products = await Product.getAllProducts();

        // Nhóm sản phẩm theo giá
        const groupedByPrice = products.reduce((acc, product) => {
            const priceRange = `${Math.floor(product.price / 100) * 100}-${Math.ceil(product.price / 100) * 100 - 1}`;
            if (!acc[priceRange]) {
                acc[priceRange] = [];
            }
            acc[priceRange].push(product);
            return acc;
        }, {});

        res.json(groupedByPrice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Nhóm sản phẩm theo loại
const getProductsGroupedByType = async (req, res) => {
    try {
        const products = await Product.getAllProducts();

        // Nhóm sản phẩm theo loại
        const groupedByType = products.reduce((acc, product) => {
            if (!acc[product.type]) {
                acc[product.type] = [];
            }
            acc[product.type].push(product);
            return acc;
        }, {});

        res.json(groupedByType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProductsGroupedByPrice,
    getProductsGroupedByType,
};
