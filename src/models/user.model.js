const pool = require('../utils/db');

// Tạo người dùng
const create = async (username, email, password, role = 'user') => {
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
        [username, email, password, role]
    );
    return result;
};

// Tìm người dùng theo email
const findByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Tìm người dùng theo ID
const findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Cập nhật thông tin người dùng
const update = async (id, username, email, role) => {
    const [result] = await pool.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?', [username, email, role, id]);
    return result;
};

// Phân quyền người dùng
const grantRole = async (userId, role) => {
    const [result] = await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
    return result;
};


module.exports = {
    create,
    findByEmail,
    findById,
    update,
    grantRole
};
