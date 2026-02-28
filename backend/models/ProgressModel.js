const { pool } = require('../config/db');

class ProgressModel {
  static async findByUserAndVideo(userId, videoId) {
    const [rows] = await pool.execute(
      'SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?',
      [userId, videoId]
    );
    return rows[0] || null;
  }

  static async upsert({ userId, videoId, lastWatchedSeconds, completed }) {
    await pool.execute(
      `INSERT INTO video_progress (user_id, video_id, last_watched_seconds, completed)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         last_watched_seconds = VALUES(last_watched_seconds),
         completed = VALUES(completed),
         updated_at = NOW()`,
      [userId, videoId, lastWatchedSeconds, completed ? 1 : 0]
    );
  }

  static async findAllByUserAndSubject(userId, subjectId) {
    const [rows] = await pool.execute(
      `SELECT vp.*, v.title as video_title, v.order_index as video_order,
              sec.title as section_title, sec.order_index as section_order
       FROM video_progress vp
       INNER JOIN videos v ON v.id = vp.video_id
       INNER JOIN sections sec ON sec.id = v.section_id
       WHERE vp.user_id = ? AND sec.subject_id = ?
       ORDER BY sec.order_index ASC, v.order_index ASC`,
      [userId, subjectId]
    );
    return rows;
  }

  // Get the last video the user was watching in a subject
  static async findLastWatched(userId, subjectId) {
    const [rows] = await pool.execute(
      `SELECT vp.*, v.id as video_id, v.title, v.video_url, v.section_id, v.duration_seconds,
              sec.title as section_title
       FROM video_progress vp
       INNER JOIN videos v ON v.id = vp.video_id
       INNER JOIN sections sec ON sec.id = v.section_id
       WHERE vp.user_id = ? AND sec.subject_id = ? AND vp.completed = 0
       ORDER BY vp.updated_at DESC
       LIMIT 1`,
      [userId, subjectId]
    );

    if (rows[0]) return rows[0];

    // If all completed or none started, return first video
    const [first] = await pool.execute(
      `SELECT v.*, sec.title as section_title
       FROM videos v
       INNER JOIN sections sec ON sec.id = v.section_id
       WHERE sec.subject_id = ?
       ORDER BY sec.order_index ASC, v.order_index ASC
       LIMIT 1`,
      [subjectId]
    );
    return first[0] || null;
  }

  // Check if previous video in sequence is completed (for unlock logic)
  static async isPreviousCompleted(userId, videoId) {
    const [current] = await pool.execute(
      `SELECT v.order_index, v.section_id, sec.order_index as section_order, sec.subject_id
       FROM videos v INNER JOIN sections sec ON sec.id = v.section_id
       WHERE v.id = ?`,
      [videoId]
    );

    if (!current[0]) return false;
    const curr = current[0];

    // Check if this is the very first video in the subject
    const [prevInSection] = await pool.execute(
      `SELECT v.id FROM videos v WHERE v.section_id = ? AND v.order_index < ? ORDER BY v.order_index DESC LIMIT 1`,
      [curr.section_id, curr.order_index]
    );

    if (!prevInSection[0]) {
      // Check if there's a previous section
      const [prevSection] = await pool.execute(
        `SELECT s.id FROM sections s WHERE s.subject_id = ? AND s.order_index < ? ORDER BY s.order_index DESC LIMIT 1`,
        [curr.subject_id, curr.section_order]
      );

      if (!prevSection[0]) return true; // This is the very first video, always accessible

      // Get last video of previous section
      const [lastOfPrevSection] = await pool.execute(
        `SELECT v.id FROM videos v WHERE v.section_id = ? ORDER BY v.order_index DESC LIMIT 1`,
        [prevSection[0].id]
      );

      if (!lastOfPrevSection[0]) return true;
      const prevVideoId = lastOfPrevSection[0].id;
      const [progress] = await pool.execute(
        'SELECT completed FROM video_progress WHERE user_id = ? AND video_id = ?',
        [userId, prevVideoId]
      );
      return progress[0]?.completed === 1;
    }

    const prevVideoId = prevInSection[0].id;
    const [progress] = await pool.execute(
      'SELECT completed FROM video_progress WHERE user_id = ? AND video_id = ?',
      [userId, prevVideoId]
    );
    return progress[0]?.completed === 1;
  }
}

module.exports = ProgressModel;
