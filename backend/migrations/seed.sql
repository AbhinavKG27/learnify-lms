USE lms_db;

-- Subjects
INSERT INTO subjects (name, description, thumbnail_url) VALUES
('Full-Stack Web Development', 'Master modern web development from HTML to deployment. Build real-world applications using React, Node.js, and databases.', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800'),
('Data Science with Python', 'Learn data analysis, visualization, machine learning, and AI with Python, Pandas, NumPy, and Scikit-learn.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'),
('UI/UX Design Fundamentals', 'Master user interface and experience design principles, Figma, design systems, and usability testing.', 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800');

-- Sections for Full-Stack Web Development (subject_id=1)
INSERT INTO sections (subject_id, title, order_index) VALUES
(1, 'HTML & CSS Foundations', 1),
(1, 'JavaScript Essentials', 2),
(1, 'React Frontend Development', 3),
(1, 'Node.js & Express Backend', 4),
(1, 'Databases & Deployment', 5);

-- Sections for Data Science (subject_id=2)
INSERT INTO sections (subject_id, title, order_index) VALUES
(2, 'Python Programming Basics', 1),
(2, 'Data Analysis with Pandas', 2),
(2, 'Data Visualization', 3),
(2, 'Machine Learning Fundamentals', 4);

-- Sections for UI/UX (subject_id=3)
INSERT INTO sections (subject_id, title, order_index) VALUES
(3, 'Design Principles & Theory', 1),
(3, 'Figma Mastery', 2),
(3, 'UX Research & Testing', 3);

-- Videos for Section 1 (HTML & CSS)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(1, 'Introduction to HTML', 'Learn the basics of HTML structure, tags, and semantic markup.', 'https://www.w3schools.com/html/mov_bbb.mp4', 120, 1),
(1, 'CSS Styling Basics', 'Explore CSS selectors, properties, and the box model.', 'https://www.w3schools.com/html/mov_bbb.mp4', 180, 2),
(1, 'Flexbox & Grid Layout', 'Master modern CSS layouts with Flexbox and CSS Grid.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3),
(1, 'Responsive Design', 'Build mobile-first, responsive websites using media queries.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 4);

-- Videos for Section 2 (JavaScript)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(2, 'JavaScript Fundamentals', 'Variables, data types, functions, and control flow in JS.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(2, 'DOM Manipulation', 'Interact with HTML elements using the DOM API.', 'https://www.w3schools.com/html/mov_bbb.mp4', 250, 2),
(2, 'Async JavaScript & Promises', 'Master callbacks, promises, and async/await patterns.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3),
(2, 'ES6+ Modern Features', 'Arrow functions, destructuring, modules, and spread operators.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 4);

-- Videos for Section 3 (React)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(3, 'React Introduction & JSX', 'Understand component-based architecture and JSX syntax.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(3, 'State & Props', 'Manage component state and pass data with props.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(3, 'React Hooks Deep Dive', 'Master useState, useEffect, useContext, and custom hooks.', 'https://www.w3schools.com/html/mov_bbb.mp4', 350, 3),
(3, 'React Router & Navigation', 'Build multi-page React apps with client-side routing.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 4);

-- Videos for Section 4 (Node.js)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(4, 'Node.js & NPM Basics', 'Set up Node.js environment and understand the event loop.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 1),
(4, 'Express.js REST API', 'Build RESTful APIs with Express.js and middleware.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(4, 'Authentication with JWT', 'Implement secure authentication using JSON Web Tokens.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 3),
(4, 'Error Handling & Validation', 'Best practices for API error handling and input validation.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 4);

-- Videos for Section 5 (Databases)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(5, 'MySQL & SQL Fundamentals', 'Design schemas and write efficient SQL queries.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(5, 'ORM with Sequelize', 'Use Sequelize ORM to interact with databases in Node.js.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(5, 'Deployment with Docker', 'Containerize your full-stack app and deploy to the cloud.', 'https://www.w3schools.com/html/mov_bbb.mp4', 400, 3),
(5, 'CI/CD Pipeline Setup', 'Automate testing and deployment with GitHub Actions.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 4);

-- Videos for Section 6 (Python Basics)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(6, 'Python Setup & Syntax', 'Install Python and learn fundamental syntax and data types.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 1),
(6, 'Functions & Classes', 'Write reusable code with functions and OOP in Python.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(6, 'File I/O & Libraries', 'Read/write files and use Python standard library modules.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 3);

-- Videos for Section 7 (Pandas)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(7, 'Introduction to Pandas', 'DataFrames, Series, and data loading with Pandas.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 1),
(7, 'Data Cleaning & Transformation', 'Handle missing data, duplicates, and data transformations.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(7, 'Aggregation & GroupBy', 'Group data and compute aggregate statistics with Pandas.', 'https://www.w3schools.com/html/mov_bbb.mp4', 290, 3);

-- Videos for Section 8 (Visualization)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(8, 'Matplotlib Basics', 'Create line plots, bar charts, and scatter plots.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(8, 'Seaborn Statistical Plots', 'Create beautiful statistical visualizations with Seaborn.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(8, 'Interactive Charts with Plotly', 'Build interactive, web-ready charts using Plotly.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 3);

-- Videos for Section 9 (ML)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(9, 'Introduction to Machine Learning', 'Supervised vs unsupervised learning, model workflow.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 1),
(9, 'Scikit-learn Fundamentals', 'Train, evaluate, and tune ML models with Scikit-learn.', 'https://www.w3schools.com/html/mov_bbb.mp4', 400, 2),
(9, 'Neural Networks with TensorFlow', 'Build and train deep learning models using TensorFlow.', 'https://www.w3schools.com/html/mov_bbb.mp4', 450, 3);

-- Videos for Section 10 (Design Principles)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(10, 'Design Thinking Process', 'Empathize, define, ideate, prototype, and test.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 1),
(10, 'Typography & Color Theory', 'Choose fonts and colors that communicate effectively.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(10, 'Layout & Visual Hierarchy', 'Guide user attention with spacing, contrast, and alignment.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3);

-- Videos for Section 11 (Figma)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(11, 'Figma Interface Overview', 'Navigate Figma and understand frames, layers, and tools.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 1),
(11, 'Components & Design Systems', 'Build reusable components and maintain design consistency.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(11, 'Prototyping & Interactions', 'Create clickable prototypes with transitions and animations.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3);

-- Videos for Section 12 (UX Research)
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(12, 'User Research Methods', 'Conduct interviews, surveys, and usability studies.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(12, 'Usability Testing', 'Plan and run usability tests to find and fix UX issues.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(12, 'Accessibility & Inclusive Design', 'Design for all users with WCAG guidelines and ARIA.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3);


USE lms_db;

-- ============================================================
-- 12 NEW SUBJECTS WITH THUMBNAIL IMAGES
-- ============================================================

INSERT INTO subjects (name, description, thumbnail_url) VALUES
('JavaScript Mastery', 'Deep dive into modern JavaScript — ES6+, async patterns, closures, prototypes, and building real-world apps from scratch.', 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800'),
('React & Next.js Pro', 'Master React hooks, context, performance optimization, and build production-grade apps with Next.js, SSR, and API routes.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'),
('Python for Beginners', 'Start your programming journey with Python. Learn syntax, data structures, OOP, file handling, and build fun projects.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800'),
('DevOps & CI/CD', 'Master Docker, Kubernetes, GitHub Actions, Jenkins, and cloud deployments. Automate everything from build to production.', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'),
('Cybersecurity Fundamentals', 'Understand threats, vulnerabilities, ethical hacking basics, network security, encryption, and how to protect systems.', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800'),
('Mobile App Development with Flutter', 'Build beautiful cross-platform iOS and Android apps using Flutter and Dart. From widgets to state management and deployment.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'),
('Cloud Computing with AWS', 'Learn Amazon Web Services — EC2, S3, Lambda, RDS, IAM, CloudFormation, and architect scalable cloud solutions.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'),
('Artificial Intelligence Basics', 'Explore AI concepts — search algorithms, knowledge representation, planning, natural language processing, and ethics of AI.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'),
('Blockchain & Web3 Development', 'Build decentralized apps with Solidity, Ethereum, smart contracts, Hardhat, and integrate with MetaMask and Web3.js.', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800'),
('Digital Marketing Mastery', 'Learn SEO, Google Ads, social media marketing, email campaigns, analytics, and growth hacking strategies that drive results.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'),
('Video Editing with Premiere Pro', 'Master Adobe Premiere Pro — cuts, color grading, motion graphics, audio mixing, and delivering professional video content.', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800'),
('3D Modeling with Blender', 'Create stunning 3D models, animations, and renders using Blender. Covers modeling, rigging, texturing, lighting, and rendering.', 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800');

-- ============================================================
-- SECTIONS for JavaScript Mastery (subject_id = 4)
-- ============================================================
INSERT INTO sections (subject_id, title, order_index) VALUES
(4, 'JS Foundations Refresher', 1),
(4, 'Advanced Functions & Closures', 2),
(4, 'Asynchronous JavaScript', 3),
(4, 'DOM & Browser APIs', 4),
(4, 'Modern Tooling & Modules', 5);

-- SECTIONS for React & Next.js Pro (subject_id = 5)
INSERT INTO sections (subject_id, title, order_index) VALUES
(5, 'React Core Concepts', 1),
(5, 'Advanced Hooks & Patterns', 2),
(5, 'State Management', 3),
(5, 'Next.js Deep Dive', 4);

-- SECTIONS for Python for Beginners (subject_id = 6)
INSERT INTO sections (subject_id, title, order_index) VALUES
(6, 'Getting Started with Python', 1),
(6, 'Data Structures & Algorithms', 2),
(6, 'Object-Oriented Python', 3),
(6, 'File Handling & Libraries', 4);

-- SECTIONS for DevOps & CI/CD (subject_id = 7)
INSERT INTO sections (subject_id, title, order_index) VALUES
(7, 'Linux & Shell Scripting', 1),
(7, 'Docker & Containerization', 2),
(7, 'Kubernetes Orchestration', 3),
(7, 'CI/CD Pipelines', 4);

-- SECTIONS for Cybersecurity (subject_id = 8)
INSERT INTO sections (subject_id, title, order_index) VALUES
(8, 'Security Fundamentals', 1),
(8, 'Network Security', 2),
(8, 'Ethical Hacking Basics', 3),
(8, 'Cryptography & Encryption', 4);

-- SECTIONS for Flutter (subject_id = 9)
INSERT INTO sections (subject_id, title, order_index) VALUES
(9, 'Dart Programming Language', 1),
(9, 'Flutter UI & Widgets', 2),
(9, 'Navigation & State Management', 3),
(9, 'APIs, Firebase & Deployment', 4);

-- SECTIONS for AWS (subject_id = 10)
INSERT INTO sections (subject_id, title, order_index) VALUES
(10, 'Cloud & AWS Fundamentals', 1),
(10, 'Compute & Storage Services', 2),
(10, 'Databases & Networking', 3),
(10, 'Security, Monitoring & Cost', 4);

-- SECTIONS for AI Basics (subject_id = 11)
INSERT INTO sections (subject_id, title, order_index) VALUES
(11, 'Introduction to AI', 1),
(11, 'Search & Optimization', 2),
(11, 'Machine Learning Overview', 3),
(11, 'NLP & Ethics', 4);

-- SECTIONS for Blockchain (subject_id = 12)
INSERT INTO sections (subject_id, title, order_index) VALUES
(12, 'Blockchain Fundamentals', 1),
(12, 'Solidity Smart Contracts', 2),
(12, 'Building DApps', 3),
(12, 'Web3 & MetaMask Integration', 4);

-- SECTIONS for Digital Marketing (subject_id = 13)
INSERT INTO sections (subject_id, title, order_index) VALUES
(13, 'Marketing Strategy & Branding', 1),
(13, 'SEO & Content Marketing', 2),
(13, 'Paid Ads & Social Media', 3),
(13, 'Analytics & Growth Hacking', 4);

-- SECTIONS for Video Editing (subject_id = 14)
INSERT INTO sections (subject_id, title, order_index) VALUES
(14, 'Premiere Pro Interface & Basics', 1),
(14, 'Cutting, Timing & Transitions', 2),
(14, 'Color Grading & Audio', 3),
(14, 'Motion Graphics & Export', 4);

-- SECTIONS for 3D Modeling (subject_id = 15)
INSERT INTO sections (subject_id, title, order_index) VALUES
(15, 'Blender Interface & Navigation', 1),
(15, 'Mesh Modeling Techniques', 2),
(15, 'Materials, Textures & Lighting', 3),
(15, 'Animation & Rendering', 4);


-- ============================================================
-- VIDEOS — JavaScript Mastery (sections 13–17)
-- ============================================================
-- Section: JS Foundations Refresher
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(13, 'Variables, Scope & Hoisting', 'Understand var, let, const and how JavaScript handles scope and hoisting under the hood.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 1),
(13, 'Arrays & Object Deep Dive', 'Master array methods (map, filter, reduce) and object manipulation techniques.', 'https://www.w3schools.com/html/mov_bbb.mp4', 310, 2),
(13, 'Destructuring & Spread Operator', 'Clean, modern syntax for working with arrays and objects in ES6+.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3);

-- Section: Advanced Functions & Closures
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(14, 'Higher-Order Functions', 'Functions that accept or return other functions — the heart of functional programming in JS.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(14, 'Closures Explained', 'What closures are, why they exist, and where they are used in real-world code.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(14, 'The "this" Keyword', 'Understand how "this" behaves in different contexts — methods, classes, arrow functions.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3);

-- Section: Asynchronous JavaScript
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(15, 'Event Loop & Call Stack', 'Visualize how JavaScript executes asynchronous code behind the scenes.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 1),
(15, 'Promises & Chaining', 'Write clean async code with Promises and avoid callback hell.', 'https://www.w3schools.com/html/mov_bbb.mp4', 290, 2),
(15, 'Async/Await Patterns', 'Modern, readable async code with try/catch error handling.', 'https://www.w3schools.com/html/mov_bbb.mp4', 270, 3),
(15, 'Fetch API & Error Handling', 'Make HTTP requests, handle responses, and manage errors gracefully.', 'https://www.w3schools.com/html/mov_bbb.mp4', 250, 4);

-- Section: DOM & Browser APIs
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(16, 'DOM Traversal & Manipulation', 'Query, create, update, and delete DOM elements efficiently.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(16, 'Event Delegation & Bubbling', 'Handle events efficiently with delegation and understand event propagation.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(16, 'Local Storage & Session Storage', 'Persist data in the browser and manage app state across sessions.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 3);

-- Section: Modern Tooling & Modules
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(17, 'ES Modules (import/export)', 'Organize code into reusable modules using modern JavaScript module syntax.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(17, 'Webpack & Vite Basics', 'Bundle and optimize JavaScript projects for production.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(17, 'npm & Package Management', 'Work with npm packages, scripts, and manage dependencies like a pro.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 3);


-- ============================================================
-- VIDEOS — React & Next.js Pro (sections 18–21)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(18, 'JSX & Component Thinking', 'How to think in components and write expressive JSX markup.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(18, 'Props, Children & PropTypes', 'Pass data between components and validate with PropTypes.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 2),
(18, 'Conditional Rendering Patterns', 'Different patterns for conditionally showing UI elements.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(19, 'useEffect Mastery', 'Side effects, dependency arrays, cleanup functions, and common pitfalls.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 1),
(19, 'useReducer & useContext', 'Scale state management beyond useState with reducer patterns.', 'https://www.w3schools.com/html/mov_bbb.mp4', 310, 2),
(19, 'Custom Hooks', 'Extract and reuse logic with your own custom React hooks.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3),
(19, 'Performance: useMemo & useCallback', 'Prevent unnecessary re-renders and optimize heavy computations.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(20, 'Context API vs Zustand', 'Choose the right global state solution for your React app.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 1),
(20, 'React Query for Server State', 'Manage API data, caching, loading, and error states effortlessly.', 'https://www.w3schools.com/html/mov_bbb.mp4', 350, 2),
(20, 'Form Management with React Hook Form', 'Build performant, accessible forms with validation.', 'https://www.w3schools.com/html/mov_bbb.mp4', 290, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(21, 'Next.js Routing & Layouts', 'App Router, nested layouts, and dynamic routes in Next.js 14.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 1),
(21, 'Server vs Client Components', 'Understand when to use server components and client components.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 2),
(21, 'API Routes & Server Actions', 'Build backend endpoints directly inside your Next.js project.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 3),
(21, 'Deployment to Vercel', 'Deploy your Next.js app, configure env vars, and set up CI.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 4);


-- ============================================================
-- VIDEOS — Python for Beginners (sections 22–25)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(22, 'Installing Python & VS Code', 'Set up your development environment and write your first Python script.', 'https://www.w3schools.com/html/mov_bbb.mp4', 180, 1),
(22, 'Variables, Types & Input', 'Learn Python data types, variables, and reading user input.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 2),
(22, 'Control Flow: if, for, while', 'Write logic with conditionals and loops in Python.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(23, 'Lists, Tuples & Sets', 'Work with Python sequence types and understand their differences.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(23, 'Dictionaries & JSON', 'Store key-value data and convert between Python dicts and JSON.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 2),
(23, 'List Comprehensions', 'Write concise, Pythonic code with list and dict comprehensions.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(24, 'Classes & Objects', 'Define classes, create objects, and understand OOP principles.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(24, 'Inheritance & Polymorphism', 'Extend classes and override methods for flexible code design.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(24, 'Decorators & Context Managers', 'Advanced Python patterns for cleaner and more reusable code.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(25, 'Reading & Writing Files', 'Open, read, write, and manage files in Python.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 1),
(25, 'Working with APIs using Requests', 'Fetch data from REST APIs and parse JSON responses.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(25, 'Introduction to pip & Virtual Envs', 'Manage packages and isolate project dependencies properly.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 3);


-- ============================================================
-- VIDEOS — DevOps & CI/CD (sections 26–29)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(26, 'Linux Command Line Essentials', 'Navigate the filesystem, manage files, and run processes from the terminal.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(26, 'Shell Scripting Basics', 'Automate tasks with bash scripts, variables, loops, and conditionals.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(26, 'SSH, SCP & Remote Access', 'Connect to remote servers securely and transfer files.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(27, 'Docker Fundamentals', 'Containers vs VMs, Docker architecture, images, and the Docker CLI.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 1),
(27, 'Writing Dockerfiles', 'Build custom Docker images for Node.js, Python, and more.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(27, 'Docker Compose', 'Orchestrate multi-container apps with docker-compose.yml.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 3),
(27, 'Docker Networking & Volumes', 'Connect containers and persist data with volumes.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(28, 'Kubernetes Architecture', 'Pods, nodes, clusters, services, and the control plane explained.', 'https://www.w3schools.com/html/mov_bbb.mp4', 380, 1),
(28, 'Deployments & Services', 'Deploy apps to Kubernetes and expose them with services.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 2),
(28, 'ConfigMaps, Secrets & Scaling', 'Manage configuration and auto-scale your Kubernetes workloads.', 'https://www.w3schools.com/html/mov_bbb.mp4', 310, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(29, 'Git Workflows & Branching', 'Feature branches, GitFlow, and pull request best practices.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(29, 'GitHub Actions CI Pipeline', 'Automate tests and builds on every push with GitHub Actions.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 2),
(29, 'Continuous Deployment to AWS', 'Automatically deploy your app to EC2 or ECS on every merge.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 3);


-- ============================================================
-- VIDEOS — Cybersecurity (sections 30–33)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(30, 'CIA Triad & Security Concepts', 'Confidentiality, Integrity, Availability — the pillars of information security.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(30, 'Types of Cyber Attacks', 'Phishing, malware, ransomware, DoS, MITM attacks explained.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(30, 'OWASP Top 10 Vulnerabilities', 'The most critical web application security risks and how to prevent them.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(31, 'TCP/IP & Network Protocols', 'How data travels across networks and common protocol vulnerabilities.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(31, 'Firewalls & IDS/IPS', 'Configure firewalls and detect intrusions with IDS systems.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(31, 'VPNs & Secure Tunneling', 'Protect network traffic with VPNs and understand tunneling protocols.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(32, 'Reconnaissance & Footprinting', 'Gather information about a target using OSINT tools and techniques.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(32, 'Scanning with Nmap', 'Discover open ports and services on a network with Nmap.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(32, 'SQL Injection & XSS', 'Understand and exploit (and fix) the two most common web vulnerabilities.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(33, 'Symmetric vs Asymmetric Encryption', 'AES, RSA, and how modern encryption protects your data.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(33, 'Hashing & Digital Signatures', 'SHA-256, bcrypt, digital signatures, and certificate chains.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(33, 'SSL/TLS & HTTPS', 'How HTTPS works, TLS handshake, and securing web communications.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3);


-- ============================================================
-- VIDEOS — Flutter (sections 34–37)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(34, 'Dart Syntax & Variables', 'Learn Dart basics — types, variables, functions, and null safety.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(34, 'Object-Oriented Dart', 'Classes, interfaces, mixins, and generics in Dart.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(34, 'Async Dart: Futures & Streams', 'Handle asynchronous operations in Dart with Future and Stream.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(35, 'Flutter Widget Tree', 'Understand Stateless vs Stateful widgets and the widget lifecycle.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(35, 'Layouts: Row, Column & Stack', 'Build responsive layouts using Flutter core layout widgets.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(35, 'Material Design & Custom Themes', 'Apply Material 3 design and create custom app themes.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3),
(35, 'Lists, Grids & Scroll Views', 'Build scrollable lists and grids with real data.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(36, 'Flutter Navigation & Routes', 'Navigate between screens using Navigator 2.0 and GoRouter.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(36, 'State Management with Provider', 'Manage app state cleanly with the Provider package.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(36, 'Riverpod & Bloc Introduction', 'Overview of advanced state management solutions.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(37, 'REST API Integration', 'Fetch and display data from REST APIs using http and Dio.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(37, 'Firebase Auth & Firestore', 'Add authentication and real-time database to your Flutter app.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 2),
(37, 'Build & Deploy to App Stores', 'Generate APK/IPA files and submit to Google Play and Apple App Store.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 3);


-- ============================================================
-- VIDEOS — AWS (sections 38–41)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(38, 'What is Cloud Computing?', 'IaaS, PaaS, SaaS models and why cloud matters for modern development.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(38, 'AWS Global Infrastructure', 'Regions, Availability Zones, Edge Locations explained.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 2),
(38, 'IAM Users, Roles & Policies', 'Control access to AWS resources with Identity and Access Management.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(39, 'EC2: Launch & Configure Servers', 'Launch virtual machines, configure security groups, and SSH in.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 1),
(39, 'S3: Object Storage Mastery', 'Store files, host static websites, and configure bucket policies.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(39, 'Lambda & Serverless Functions', 'Run code without managing servers using AWS Lambda and API Gateway.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 3),
(39, 'Elastic Load Balancing & Auto Scaling', 'Build highly available, scalable architectures on AWS.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(40, 'RDS: Managed Relational Databases', 'Set up MySQL, PostgreSQL on Amazon RDS with backups and replicas.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(40, 'DynamoDB: NoSQL at Scale', 'Design and query DynamoDB tables for high-performance workloads.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(40, 'VPC & Networking', 'Design secure cloud networks with subnets, routing tables, and NAT.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(41, 'CloudWatch & Logging', 'Monitor your AWS resources with metrics, alarms, and log groups.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 1),
(41, 'AWS Cost Optimization', 'Use Cost Explorer, Savings Plans, and Reserved Instances to cut costs.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(41, 'CloudFormation & Infrastructure as Code', 'Define and provision AWS infrastructure using CloudFormation templates.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 3);


-- ============================================================
-- VIDEOS — AI Basics (sections 42–45)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(42, 'What is Artificial Intelligence?', 'History of AI, types of AI, and real-world applications today.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(42, 'AI vs ML vs Deep Learning', 'Understand the difference between these often-confused terms.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 2),
(42, 'Setting Up Your AI Environment', 'Install Python, Jupyter Notebook, and key AI libraries.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(43, 'Uninformed Search: BFS & DFS', 'Solve problems with breadth-first and depth-first search algorithms.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(43, 'Heuristic Search: A* Algorithm', 'Find optimal paths efficiently using heuristics.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(43, 'Genetic Algorithms', 'Optimize solutions using evolutionary computation techniques.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(44, 'Supervised Learning Overview', 'Regression and classification explained with real examples.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(44, 'Unsupervised Learning & Clustering', 'K-Means and hierarchical clustering for pattern discovery.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(44, 'Neural Networks from Scratch', 'Build a simple neural network using only NumPy to understand the math.', 'https://www.w3schools.com/html/mov_bbb.mp4', 420, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(45, 'Text Preprocessing & Tokenization', 'Clean and prepare text data for NLP tasks.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 1),
(45, 'Sentiment Analysis', 'Classify text as positive, negative, or neutral using ML.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(45, 'AI Ethics & Bias', 'Fairness, transparency, accountability, and the risks of AI systems.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 3);


-- ============================================================
-- VIDEOS — Blockchain (sections 46–49)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(46, 'How Blockchain Works', 'Blocks, chains, hashing, consensus mechanisms, and immutability.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(46, 'Bitcoin vs Ethereum', 'Key differences between the two most important blockchains.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(46, 'Wallets, Keys & Transactions', 'Public/private keys, wallet addresses, and how transactions work.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(47, 'Solidity Syntax & Data Types', 'Write your first smart contract with variables, functions, and events.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 1),
(47, 'Smart Contract Security', 'Reentrancy attacks, integer overflow, and how to write secure contracts.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 2),
(47, 'Testing with Hardhat', 'Write and run tests for your smart contracts using Hardhat and Chai.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 3),
(47, 'Deploying to Testnet', 'Deploy your contract to Goerli/Sepolia testnet and verify on Etherscan.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(48, 'Building a DApp Frontend', 'Connect a React app to your deployed smart contract.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 1),
(48, 'ERC-20 Token Creation', 'Deploy your own fungible token on the Ethereum blockchain.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(48, 'NFT: ERC-721 Smart Contract', 'Build and deploy an NFT smart contract with minting functionality.', 'https://www.w3schools.com/html/mov_bbb.mp4', 380, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(49, 'MetaMask Setup & Integration', 'Connect MetaMask to your DApp and handle wallet connection.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(49, 'Ethers.js vs Web3.js', 'Read and write blockchain data from your frontend using Ethers.js.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(49, 'IPFS for Decentralized Storage', 'Store NFT metadata and files on IPFS using Pinata.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3);


-- ============================================================
-- VIDEOS — Digital Marketing (sections 50–53)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(50, 'Building a Marketing Strategy', 'Define target audience, set goals, and create a marketing roadmap.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 1),
(50, 'Brand Identity & Positioning', 'Craft a memorable brand voice, visual identity, and unique value proposition.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 2),
(50, 'Customer Journey Mapping', 'Map every touchpoint from awareness to purchase to loyalty.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(51, 'SEO Fundamentals', 'On-page SEO, keyword research, meta tags, and site structure.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(51, 'Link Building & Off-page SEO', 'Earn backlinks, improve domain authority, and rank higher on Google.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(51, 'Content Marketing & Blogging', 'Create content that ranks, converts, and builds trust with your audience.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3),
(51, 'Email Marketing Campaigns', 'Build lists, write copy, design emails, and automate sequences.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(52, 'Google Ads & PPC', 'Set up search and display campaigns, write ad copy, and optimize bids.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 1),
(52, 'Social Media Marketing', 'Grow on Instagram, LinkedIn, TikTok, and X with organic strategies.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(52, 'Meta Ads (Facebook & Instagram)', 'Run paid social campaigns with precise audience targeting.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(53, 'Google Analytics 4', 'Track users, conversions, and marketing performance with GA4.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(53, 'A/B Testing & CRO', 'Run split tests to improve conversion rates and optimize funnels.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(53, 'Growth Hacking Strategies', 'Viral loops, referral programs, and product-led growth techniques.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 3);


-- ============================================================
-- VIDEOS — Video Editing (sections 54–57)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(54, 'Premiere Pro Interface Tour', 'Panels, workspaces, sequences, and customizing your editing layout.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(54, 'Importing & Organizing Media', 'Import footage, create bins, and organize your project efficiently.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 2),
(54, 'Timeline Basics & Playback', 'Work with the timeline, set in/out points, and navigate your edit.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(55, 'The Art of the Cut', 'J-cuts, L-cuts, match cuts, and principles of seamless editing.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 1),
(55, 'Transitions & Effects', 'Apply and customize transitions without overusing them.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 2),
(55, 'Speed Ramping & Time Remapping', 'Create slow-motion, fast-motion, and dramatic speed ramp effects.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3),
(55, 'Working with Text & Titles', 'Add animated lower thirds, titles, and credits using Essential Graphics.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(56, 'Color Correction with Lumetri', 'Fix exposure, white balance, and color casts using Lumetri Color.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(56, 'Creative Color Grading', 'Apply cinematic color grades and create distinctive visual styles.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 2),
(56, 'Audio Mixing & Sound Design', 'Balance dialogue, music, SFX, and use the Essential Sound panel.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(57, 'Motion Graphics with After Effects', 'Link Premiere to After Effects for advanced title animations.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 1),
(57, 'Export Settings for Every Platform', 'Export optimized videos for YouTube, Instagram, TikTok, and clients.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 2),
(57, 'Building a Video Editing Workflow', 'Professional organization, versioning, and delivery best practices.', 'https://www.w3schools.com/html/mov_bbb.mp4', 260, 3);


-- ============================================================
-- VIDEOS — 3D Modeling with Blender (sections 58–61)
-- ============================================================
INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(58, 'Blender Interface & Navigation', 'Navigate the 3D viewport, panels, and customize your workspace.', 'https://www.w3schools.com/html/mov_bbb.mp4', 240, 1),
(58, 'Object Mode vs Edit Mode', 'Understand the core modes and how to switch between them.', 'https://www.w3schools.com/html/mov_bbb.mp4', 220, 2),
(58, 'Essential Shortcuts & Workflow', 'Master the keyboard shortcuts that make Blender fast and intuitive.', 'https://www.w3schools.com/html/mov_bbb.mp4', 200, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(59, 'Polygon Modeling Fundamentals', 'Extrude, loop cut, bevel, and inset to build any 3D shape.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 1),
(59, 'Modifiers: Subdivision & Mirror', 'Use non-destructive modifiers to speed up your modeling workflow.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 2),
(59, 'Sculpting in Blender', 'Use sculpt mode brushes to create organic shapes and details.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 3),
(59, 'Retopology & Clean Geometry', 'Create clean, production-ready topology for animation and games.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 4);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(60, 'UV Unwrapping', 'Unwrap your 3D models to prepare them for texturing.', 'https://www.w3schools.com/html/mov_bbb.mp4', 300, 1),
(60, 'Materials & Shader Nodes', 'Use the Shader Editor and Principled BSDF to create realistic materials.', 'https://www.w3schools.com/html/mov_bbb.mp4', 340, 2),
(60, 'HDRI & 3-Point Lighting', 'Light your scenes professionally with HDRI and studio lighting setups.', 'https://www.w3schools.com/html/mov_bbb.mp4', 280, 3);

INSERT INTO videos (section_id, title, description, video_url, duration_seconds, order_index) VALUES
(61, 'Rigging & Armatures', 'Add a skeleton to your model and set up bone constraints.', 'https://www.w3schools.com/html/mov_bbb.mp4', 380, 1),
(61, 'Keyframe Animation Basics', 'Animate objects with keyframes, the timeline, and the graph editor.', 'https://www.w3schools.com/html/mov_bbb.mp4', 320, 2),
(61, 'Cycles Rendering & Output', 'Render photorealistic images and animations with Cycles.', 'https://www.w3schools.com/html/mov_bbb.mp4', 360, 3);