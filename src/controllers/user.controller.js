const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Đăng ký người dùng mới
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Mã hóa mật khẩu
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        // Tạo người dùng mới với role mặc định là 'user'
        const result = await User.create(username, email, hashedPassword); // Không cần truyền role vì đã có mặc định trong model

        // Tạo token
        const token = jwt.sign({ id: result.insertId, role: 'user' }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Đăng nhập người dùng
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng theo email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // So sánh mật khẩu
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Tạo token
        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Upadate role
const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        // Kiểm tra role hợp lệ
        const validRoles = ['admin', 'staff', 'user'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Cập nhật role người dùng
        const result = await User.grantRole(userId, role);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Lấy thông tin người dùng
const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id
        );
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Cập nhật thông tin người dùng
const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const result = await User.update(req.user.id, username, email, req.user.role);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Admin Dashboard
const adminDashboard = (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
};

// Staff Dashboard
const staffDashboard = (req, res) => {
    res.json({ message: 'Welcome to the staff dashboard' });
};

module.exports = {
    register,
    login,
    profile,
    updateProfile,
    updateUserRole,
    adminDashboard,
    staffDashboard
};
