const { pool } = require('../config/db');

class RefreshTokenModel {
  static async create(userId, token, expiresAt) {
    await pool.execute(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    );
  }

  static async findByToken(token) {
    const [rows] = await pool.execute(
      'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    return rows[0] || null;
  }

  static async deleteByToken(token) {
    await pool.execute('DELETE FROM refresh_tokens WHERE token = ?', [token]);
  }

  static async deleteByUserId(userId) {
    await pool.execute('DELETE FROM refresh_tokens WHERE user_id = ?', [userId]);
  }

  static async deleteExpired() {
    await pool.execute('DELETE FROM refresh_tokens WHERE expires_at <= NOW()');
  }
}

module.exports = RefreshTokenModel;
