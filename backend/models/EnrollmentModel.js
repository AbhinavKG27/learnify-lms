const { pool } = require('../config/db');

class EnrollmentModel {
  static async create(userId, subjectId) {
    const [result] = await pool.execute(
      'INSERT INTO enrollments (user_id, subject_id) VALUES (?, ?)',
      [userId, subjectId]
    );
    return { id: result.insertId, userId, subjectId };
  }

  static async findByUserAndSubject(userId, subjectId) {
    const [rows] = await pool.execute(
      'SELECT * FROM enrollments WHERE user_id = ? AND subject_id = ?',
      [userId, subjectId]
    );
    return rows[0] || null;
  }

  static async findAllByUser(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM enrollments WHERE user_id = ?',
      [userId]
    );
    return rows;
  }
}

module.exports = EnrollmentModel;
