const { pool } = require('../config/db');

class SubjectModel {
  static async findAll() {
    const [rows] = await pool.execute(
      `SELECT s.*, 
        COUNT(DISTINCT sec.id) as section_count,
        COUNT(DISTINCT v.id) as video_count
       FROM subjects s
       LEFT JOIN sections sec ON sec.subject_id = s.id
       LEFT JOIN videos v ON v.section_id = sec.id
       GROUP BY s.id
       ORDER BY s.created_at DESC`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM subjects WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async findWithProgress(userId) {
    const [rows] = await pool.execute(
      `SELECT s.*,
        COUNT(DISTINCT sec.id) as section_count,
        COUNT(DISTINCT v.id) as video_count,
        COUNT(DISTINCT CASE WHEN vp.completed = 1 THEN vp.video_id END) as completed_videos,
        e.created_at as enrolled_at
       FROM subjects s
       LEFT JOIN sections sec ON sec.subject_id = s.id
       LEFT JOIN videos v ON v.section_id = sec.id
       LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = ?
       INNER JOIN enrollments e ON e.subject_id = s.id AND e.user_id = ?
       GROUP BY s.id, e.created_at
       ORDER BY e.created_at DESC`,
      [userId, userId]
    );
    return rows;
  }
}

module.exports = SubjectModel;
