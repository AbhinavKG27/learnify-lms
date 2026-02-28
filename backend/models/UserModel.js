const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
  static async create({ name, email, password }) {
    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );
    return { id: result.insertId, name, email };
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async verifyPassword(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
  }
}

module.exports = UserModel;
