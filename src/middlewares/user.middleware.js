const jwt = require('jsonwebtoken');

// Middleware xác thực người dùng dựa trên token
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Lưu thông tin user từ token vào request
        console.log('Authenticated user:', req.user); // Kiểm tra thông tin người dùng
        next();
    });
};

// Middleware kiểm tra quyền truy cập của người dùng
const authorize = (roles) => {
    return (req, res, next) => {
        console.log('User role:', req.user.role); // Kiểm tra vai trò của người dùng
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize,
};
