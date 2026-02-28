const { pool } = require('../config/db');

class SectionModel {
  static async findBySubjectId(subjectId) {
    const [rows] = await pool.execute(
      'SELECT * FROM sections WHERE subject_id = ? ORDER BY order_index ASC',
      [subjectId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM sections WHERE id = ?', [id]);
    return rows[0] || null;
  }
}

module.exports = SectionModel;
