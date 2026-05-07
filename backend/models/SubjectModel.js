const { pool } = require('../config/db');

class SubjectModel {
  static async findAll() {
    const [rows] = await pool.execute(
      `SELECT s.*, u.name as instructor_name,
        COUNT(DISTINCT sec.id) as section_count,
        COUNT(DISTINCT v.id) as video_count,
        COUNT(DISTINCT e.id) as enrollment_count
       FROM subjects s
       LEFT JOIN users u ON u.id = s.instructor_id
       LEFT JOIN sections sec ON sec.subject_id = s.id
       LEFT JOIN videos v ON v.section_id = sec.id
       LEFT JOIN enrollments e ON e.subject_id = s.id
       GROUP BY s.id, u.name
       ORDER BY s.created_at DESC`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT s.*, u.name as instructor_name
       FROM subjects s
       LEFT JOIN users u ON u.id = s.instructor_id
       WHERE s.id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  static async findWithProgress(userId) {
    const [rows] = await pool.execute(
      `SELECT s.*, u.name as instructor_name,
        COUNT(DISTINCT sec.id) as section_count,
        COUNT(DISTINCT v.id) as video_count,
        COUNT(DISTINCT CASE WHEN vp.completed = 1 THEN vp.video_id END) as completed_videos,
        e.created_at as enrolled_at
       FROM subjects s
       LEFT JOIN users u ON u.id = s.instructor_id
       LEFT JOIN sections sec ON sec.subject_id = s.id
       LEFT JOIN videos v ON v.section_id = sec.id
       LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = ?
       INNER JOIN enrollments e ON e.subject_id = s.id AND e.user_id = ?
       GROUP BY s.id, u.name, e.created_at
       ORDER BY e.created_at DESC`,
      [userId, userId]
    );
    return rows;
  }

  static async findByInstructor(instructorId) {
    const [rows] = await pool.execute(
      `SELECT s.*, u.name as instructor_name,
        COUNT(DISTINCT sec.id) as section_count,
        COUNT(DISTINCT v.id) as video_count,
        COUNT(DISTINCT e.id) as enrollment_count,
        COUNT(DISTINCT vp.id) as progress_events,
        COUNT(DISTINCT CASE WHEN vp.completed = 1 THEN vp.video_id END) as completed_videos
       FROM subjects s
       LEFT JOIN users u ON u.id = s.instructor_id
       LEFT JOIN sections sec ON sec.subject_id = s.id
       LEFT JOIN videos v ON v.section_id = sec.id
       LEFT JOIN enrollments e ON e.subject_id = s.id
       LEFT JOIN video_progress vp ON vp.video_id = v.id
       WHERE s.instructor_id = ?
       GROUP BY s.id, u.name
       ORDER BY s.created_at DESC`,
      [instructorId]
    );
    return rows;
  }

  static async create({ name, description, thumbnailUrl, instructorId }) {
    const [result] = await pool.execute(
      'INSERT INTO subjects (name, description, thumbnail_url, instructor_id) VALUES (?, ?, ?, ?)',
      [name, description || null, thumbnailUrl || null, instructorId]
    );
    return this.findById(result.insertId);
  }

  static async update(id, { name, description, thumbnailUrl }) {
    await pool.execute(
      'UPDATE subjects SET name = ?, description = ?, thumbnail_url = ? WHERE id = ?',
      [name, description || null, thumbnailUrl || null, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM subjects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getEnrolledStudents(subjectId) {
    const [rows] = await pool.execute(
      `SELECT u.id, u.name, u.email, e.created_at as enrolled_at,
        COUNT(DISTINCT v.id) as total_videos,
        COUNT(DISTINCT CASE WHEN vp.completed = 1 THEN vp.video_id END) as completed_videos
       FROM enrollments e
       INNER JOIN users u ON u.id = e.user_id
       LEFT JOIN sections sec ON sec.subject_id = e.subject_id
       LEFT JOIN videos v ON v.section_id = sec.id
       LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = u.id
       WHERE e.subject_id = ?
       GROUP BY u.id, u.name, u.email, e.created_at
       ORDER BY e.created_at DESC`,
      [subjectId]
    );
    return rows;
  }
}

module.exports = SubjectModel;