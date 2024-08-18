// routes/product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Route để lấy danh sách các sản phẩm và nhóm theo giá
router.post('/group-by-price',  productController.getProductsGroupedByPrice);

// Route để lấy danh sách các sản phẩm và nhóm theo loại
router.post('/group-by-type',  productController.getProductsGroupedByType);

module.exports = router;
