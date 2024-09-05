const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const orderController = require('../controllers/order.controller');
const userMiddleware = require('../middlewares/user.middleware');
const cors = require('cors');

const corsOptions = {
    origin: [
        'https://ec-2024-08-fe.vercel.app',
        'http://localhost:3000'
    ],
    optionsSuccessStatus: 200
}

router.use(cors(corsOptions));

// Route đăng ký
router.post('/register', userController.register);

// Route đăng nhập
router.post('/login', userController.login);

// Route xem thông tin cá nhân (chỉ user đã đăng nhập)
router.get('/profile', userMiddleware.authenticate, userController.profile);

// Route cập nhật thông tin cá nhân (chỉ user đã đăng nhập)
router.put('/profile', userMiddleware.authenticate, userController.updateProfile);

// Route dành cho admin (chỉ role 'admin' có thể truy cập)
router.get('/admin', 
    userMiddleware.authenticate, 
    userMiddleware.authorize(['admin']), 
    userController.adminDashboard,

);

// xem doanh thu theo tháng
router.get('/admin/revenue',
    [userMiddleware.authenticate],
    userMiddleware.authorize(['admin']),
    orderController.getMonthlyRevenue
);

// Thay đổi role của user (chỉ role 'admin' có thể truy cập)
router.put('/admin/grant-role', 
    userMiddleware.authenticate, 
    userMiddleware.authorize(['admin']), 
    userController.updateUserRole,
);


// Route dành cho staff (chỉ role 'staff' có thể truy cập)
router.get('/staff',
    userMiddleware.authenticate,
    userMiddleware.authorize(['staff']),
    userController.staffDashboard
);

module.exports = router;
