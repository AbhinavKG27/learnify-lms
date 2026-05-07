USE lms_db;

-- Demo instructors for instructor-owned course feeds.
-- Password for each account is: LearnifyDemo123!
INSERT INTO users (email, password_hash, name, role) VALUES
('maya.chen@learnify.dev', '$2a$10$tBOAN88T9.r4nkwa/oofmORcPoQ25GM.3kGUtNOQ8LNHETYqDe6KK', 'Maya Chen', 'INSTRUCTOR'),
('noah.patel@learnify.dev', '$2a$10$tBOAN88T9.r4nkwa/oofmORcPoQ25GM.3kGUtNOQ8LNHETYqDe6KK', 'Noah Patel', 'INSTRUCTOR'),
('sofia.ramirez@learnify.dev', '$2a$10$tBOAN88T9.r4nkwa/oofmORcPoQ25GM.3kGUtNOQ8LNHETYqDe6KK', 'Sofia Ramirez', 'INSTRUCTOR'),
('liam.okafor@learnify.dev', '$2a$10$tBOAN88T9.r4nkwa/oofmORcPoQ25GM.3kGUtNOQ8LNHETYqDe6KK', 'Liam Okafor', 'INSTRUCTOR'),
('emma.johnson@learnify.dev', '$2a$10$tBOAN88T9.r4nkwa/oofmORcPoQ25GM.3kGUtNOQ8LNHETYqDe6KK', 'Emma Johnson', 'INSTRUCTOR')
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  name = VALUES(name),
  role = 'INSTRUCTOR';

-- Ten instructor-owned courses. Re-running this feed keeps the same courses
-- and re-attaches each course to one of the demo instructors above.
INSERT INTO subjects (name, description, thumbnail_url, instructor_id)
SELECT course.name, course.description, course.thumbnail_url, instructor.id
FROM (
  SELECT 1 AS course_no, 'Frontend Engineering Career Accelerator' AS name,
    'Build production-quality interfaces with React, design systems, testing, performance budgets, and portfolio-ready capstones.' AS description,
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800' AS thumbnail_url,
    'maya.chen@learnify.dev' AS instructor_email
  UNION ALL SELECT 2, 'Backend APIs with Node.js and MySQL',
    'Design secure REST APIs, model relational data, write migrations, add authentication, and deploy scalable backend services.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    'noah.patel@learnify.dev'
  UNION ALL SELECT 3, 'Practical Data Analytics Bootcamp',
    'Use spreadsheets, SQL, Python, dashboards, and storytelling techniques to turn messy datasets into business decisions.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    'sofia.ramirez@learnify.dev'
  UNION ALL SELECT 4, 'Product Design Portfolio Studio',
    'Create polished case studies through UX research, wireframing, high-fidelity UI, prototyping, and usability testing.',
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800',
    'maya.chen@learnify.dev'
  UNION ALL SELECT 5, 'Cloud DevOps Foundations',
    'Learn Linux, Docker, CI/CD, infrastructure as code, monitoring, and cloud deployment workflows for modern teams.',
    'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    'liam.okafor@learnify.dev'
  UNION ALL SELECT 6, 'Cybersecurity Analyst Starter Kit',
    'Practice threat modeling, network defense, vulnerability assessment, incident response, and security documentation.',
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
    'emma.johnson@learnify.dev'
  UNION ALL SELECT 7, 'Mobile Apps with Flutter and Firebase',
    'Ship cross-platform mobile apps with Flutter widgets, state management, Firebase auth, Firestore, and app-store release prep.',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    'noah.patel@learnify.dev'
  UNION ALL SELECT 8, 'AI Prompt Engineering for Workflows',
    'Build practical AI workflows for research, writing, analysis, automation, evaluation, and responsible team adoption.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    'sofia.ramirez@learnify.dev'
  UNION ALL SELECT 9, 'Digital Marketing Growth Lab',
    'Plan campaigns across SEO, paid ads, email, social content, analytics, conversion optimization, and growth experiments.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    'emma.johnson@learnify.dev'
  UNION ALL SELECT 10, 'Video Production and Editing Pro',
    'Produce professional videos with pre-production planning, lighting, audio, editing, color, motion graphics, and publishing workflows.',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
    'liam.okafor@learnify.dev'
) AS course
JOIN users AS instructor ON instructor.email = course.instructor_email
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  thumbnail_url = VALUES(thumbnail_url),
  instructor_id = VALUES(instructor_id);