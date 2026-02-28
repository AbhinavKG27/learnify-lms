const { pool } = require('../config/db');

class VideoModel {
  static async findBySectionId(sectionId) {
    const [rows] = await pool.execute(
      'SELECT * FROM videos WHERE section_id = ? ORDER BY order_index ASC',
      [sectionId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM videos WHERE id = ?', [id]);
    return rows[0] || null;
  }

  // Get all videos for a subject in linear order (flattened)
  static async findAllBySubjectId(subjectId) {
    const [rows] = await pool.execute(
      `SELECT v.*, sec.title as section_title, sec.order_index as section_order
       FROM videos v
       INNER JOIN sections sec ON sec.id = v.section_id
       WHERE sec.subject_id = ?
       ORDER BY sec.order_index ASC, v.order_index ASC`,
      [subjectId]
    );
    return rows;
  }

  // Get next video after given video in linear order
  static async findNextVideo(videoId) {
    const [current] = await pool.execute(
      `SELECT v.*, sec.order_index as section_order, sec.subject_id
       FROM videos v
       INNER JOIN sections sec ON sec.id = v.section_id
       WHERE v.id = ?`,
      [videoId]
    );

    if (!current[0]) return null;
    const curr = current[0];

    // Try next video in same section
    const [nextInSection] = await pool.execute(
      `SELECT v.* FROM videos v WHERE v.section_id = ? AND v.order_index > ? ORDER BY v.order_index ASC LIMIT 1`,
      [curr.section_id, curr.order_index]
    );

    if (nextInSection[0]) return nextInSection[0];

    // Try first video in next section
    const [nextSection] = await pool.execute(
      `SELECT s.id FROM sections s WHERE s.subject_id = ? AND s.order_index > ? ORDER BY s.order_index ASC LIMIT 1`,
      [curr.subject_id, curr.section_order]
    );

    if (!nextSection[0]) return null;

    const [firstInNextSection] = await pool.execute(
      `SELECT v.* FROM videos v WHERE v.section_id = ? ORDER BY v.order_index ASC LIMIT 1`,
      [nextSection[0].id]
    );

    return firstInNextSection[0] || null;
  }
}

module.exports = VideoModel;
