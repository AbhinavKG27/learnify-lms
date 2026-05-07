USE lms_db;

ALTER TABLE users
  ADD COLUMN role ENUM('STUDENT', 'INSTRUCTOR') NOT NULL DEFAULT 'STUDENT' AFTER name;

ALTER TABLE subjects
  ADD COLUMN instructor_id INT NULL AFTER thumbnail_url,
  ADD CONSTRAINT fk_subjects_instructor
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE SET NULL,
  ADD INDEX idx_subjects_instructor (instructor_id);