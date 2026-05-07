const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../middleware/auth');

class UserModel {
  static async create({ name, email, password, role = ROLES.STUDENT }) {
    const normalizedRole = role === ROLES.INSTRUCTOR ? ROLES.INSTRUCTOR : ROLES.STUDENT;
    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, normalizedRole]
    );
    return { id: result.insertId, name, email, role: normalizedRole };
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async verifyPassword(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
  }
}

module.exports = UserModel;