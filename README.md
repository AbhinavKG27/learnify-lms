<div align="center">

<img src="https://img.shields.io/badge/Learnify-LMS-6366f1?style=for-the-badge&logoColor=white" alt="Learnify LMS" height="42"/>

# 📚 Learnify LMS

**A production-grade, full-stack Learning Management System with role-based dashboards, structured course playback, real-time progress tracking, and instructor-owned course management — built on Next.js 14, Express.js, and TiDB Cloud.**

<br/>

[![Live Frontend](https://img.shields.io/badge/🖥%20Frontend-Live%20on%20Vercel-000000?style=for-the-badge&logo=vercel)](https://learnify-lms-eight.vercel.app)
[![Live Backend](https://img.shields.io/badge/⚙%20Backend-Live%20on%20Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://learnify-lms-sxra.onrender.com)
[![Database](https://img.shields.io/badge/🗄%20Database-TiDB%20Cloud-E8174B?style=for-the-badge)](https://tidbcloud.com/)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL--Compatible-TiDB-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://tidbcloud.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)

<br/>

> ⚠️ **Backend cold-start notice:** The backend is hosted on Render's free tier and may take **30–60 seconds** to wake up on the first request.

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Core Features](#-core-features)
- [Roles & Dashboards](#-roles--dashboards)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Setup](#-database-setup)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [API Reference](#-api-reference)
- [Frontend Notes](#-frontend-notes)
- [Useful Scripts](#-useful-scripts)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🔍 Overview

Learnify LMS is a **full-stack, role-aware learning platform** that enables two primary workflows:

- 🎓 **Students** — Register, browse the course catalogue, enroll, watch lessons in sequence, and track completion progress per video.
- 🧑‍🏫 **Instructors** — Register as instructors, create and own courses, manage sections and lessons, and view per-student progress analytics for their courses.

The platform is backed by **JWT-based stateless authentication** (access + refresh token rotation), **role-aware API authorization middleware**, and **Next.js route-guard middleware** — ensuring students and instructors are always routed to their correct dashboard context.

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│   Next.js 14 (pages/)  ·  React 18  ·  Tailwind CSS        │
│   Axios  ·  JWT Decode  ·  Framer Motion                    │
│                   ↕  REST / JSON                            │
│              [ Next.js Middleware ]                         │
│         Route Guard · Cookie Auth · Role Redirect          │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────┐
│                         SERVER                              │
│      Express.js REST API  ·  Node.js 18+                    │
│      JWT Middleware  ·  Role Authorization                  │
│      bcryptjs  ·  mysql2 connection pool                    │
└───────────────────────────┬─────────────────────────────────┘
                            │ TLS / SSL
┌───────────────────────────▼─────────────────────────────────┐
│                        DATABASE                             │
│          TiDB Cloud — MySQL-compatible distributed SQL      │
│  users · subjects · sections · videos · enrollments        │
│          video_progress · refresh_tokens                    │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Features

| # | Feature | Description |
|---|---------|-------------|
| 🔐 | **JWT Authentication** | Register · login · logout · refresh token rotation with stateless access tokens (15 min TTL) and persistent refresh tokens (7 day TTL) stored server-side. |
| 🛡 | **Role-Based Access Control** | `STUDENT` and `INSTRUCTOR` roles enforced at both the Express middleware layer and the Next.js route guard. |
| 📚 | **Course Management** | Instructors create, edit, and delete courses. Each course is owned by exactly one instructor via `instructor_id`. |
| 🧩 | **Section Management** | Instructors structure courses into ordered sections/modules with full CRUD. |
| 🎬 | **Lesson Management** | Instructors attach video lessons to sections with title, description, URL, duration, and order index. |
| 🎓 | **Student Enrollment** | Students browse the public course catalogue and enroll. Enrollments are unique per student–course pair. |
| 📈 | **Progress Tracking** | Per-video `last_watched_seconds` and `completed` flag persisted to `video_progress`. |
| 🔒 | **Sequential Playback** | Course player enforces lesson order — the next lesson is only accessible after the previous one is completed. |
| 📊 | **Instructor Analytics** | Instructor dashboard surfaces owned-course KPIs: total courses, lessons, enrollments, and completion rates. |
| 💎 | **Premium UI** | Responsive dashboards, stat cards, course cards, and a reusable animated `HeroSection` component. |

---

## 🧑‍🎓 Roles & Dashboards

| Role | Dashboard Route | Capabilities |
|------|----------------|--------------|
| `STUDENT` | `/dashboard/student` | Browse catalogue · enroll · watch lessons · track progress |
| `INSTRUCTOR` | `/dashboard/instructor` | Create/manage courses, sections & lessons · view enrolled student progress |

The generic `/dashboard` route reads the role from the auth cookie and redirects accordingly. `frontend/middleware.js` additionally blocks unauthorized access to role-specific routes.

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 14 | React framework, SSR, file-based routing (`pages/`) |
| [React](https://react.dev/) | 18 | Component rendering and hooks |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first responsive styling |
| [Axios](https://axios-http.com/) | — | HTTP client with interceptors |
| [jwt-decode](https://github.com/auth0/jwt-decode) | — | Client-side token payload extraction |
| [Framer Motion](https://www.framer.com/motion/) | — | Entrance animations for `HeroSection.tsx` *(optional install)* |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | 18+ | Runtime |
| [Express.js](https://expressjs.com/) | 5 | REST API and routing |
| [mysql2](https://github.com/sidorares/node-mysql2) | — | MySQL/TiDB connection pool with promise API |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | — | Access + refresh token signing and verification |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | — | Password hashing (bcrypt, cost factor 10) |
| [dotenv](https://github.com/motdotla/dotenv) | — | Environment variable loading |

### Database

| Technology | Purpose |
|------------|---------|
| [TiDB Cloud](https://tidbcloud.com/) | MySQL-compatible distributed SQL — hosts `lms_db` |

> TiDB Cloud is wire-compatible with MySQL 8 and supports all queries, indexes, and foreign keys used by the schema. The `ssl=true` flag is required for TiDB Cloud connections.

---

## 📁 Project Structure

```
learnify-lms/
│
├── backend/
│   ├── config/
│   │   └── db.js                        # mysql2 pool + TiDB SSL config
│   ├── controllers/
│   │   ├── authController.js            # register · login · refresh · logout
│   │   ├── subjectController.js         # course CRUD · enroll · sections · analytics
│   │   └── videoController.js           # video progress get/save
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT access token verification
│   │   ├── authorizeRoles.js            # Role guard (STUDENT / INSTRUCTOR)
│   │   └── errorMiddleware.js           # Centralized error handler
│   ├── migrations/
│   │   ├── changes/
│   │   │   └── 20260507_rbac.sql        # ⚠️ Legacy patch — do NOT re-run on fresh DB
│   │   ├── schema.sql                   # Full schema (use this for fresh setup)
│   │   ├── seed.sql                     # Course · section · video seed data
│   │   └── seed_instructor_courses.sql  # Demo instructor accounts + course ownership
│   ├── models/
│   │   ├── userModel.js
│   │   ├── subjectModel.js
│   │   └── videoModel.js
│   ├── prisma/
│   │   └── schema.prisma                # Reference Prisma schema (documentation only)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── videoRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                        # Express entry point
│
└── frontend/
    ├── components/
    │   ├── auth/                        # LoginForm · RegisterForm
    │   ├── course/                      # CourseCard · CourseSidebar
    │   ├── home/
    │   │   └── HeroSection.tsx          # Animated hero (Framer Motion)
    │   ├── layout/                      # Layout · Navbar · Footer
    │   └── ui/                          # Shared atomic UI components
    ├── hooks/
    │   ├── useAuth.js                   # Auth state and refresh logic
    │   └── useTheme.js
    ├── lib/
    │   └── api.js                       # Axios instance with token interceptors
    ├── middleware.js                     # Next.js route guard (auth + role)
    ├── pages/
    │   ├── index.js                     # Landing page
    │   ├── login.js
    │   ├── register.js
    │   ├── dashboard/
    │   │   ├── index.js                 # Role-based redirect
    │   │   ├── student.js               # Student workspace
    │   │   └── instructor.js            # Instructor workspace
    │   └── courses/
    │       └── [subjectId].js           # Course player
    ├── styles/
    │   └── globals.css                  # Tailwind base + custom CSS
    ├── package.json
    └── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version |
|------|----------------|
| [Node.js](https://nodejs.org/) | v18 |
| [npm](https://www.npmjs.com/) | v9 |
| MySQL-compatible DB | TiDB Cloud or local MySQL 8 |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbhinavKG27/learnify-lms.git
cd learnify-lms

# 2. Install backend dependencies
cd backend && npm install

# 3. Install frontend dependencies
cd ../frontend && npm install

# 4. (Optional) Framer Motion — required for HeroSection.tsx
npm install framer-motion

# 5. (Optional) TypeScript dev dependency
npm install -D typescript
```

---

## 🗄 Database Setup

> ✅ **Fresh install:** Run only `schema.sql` → `seed.sql` → `seed_instructor_courses.sql` — in that order.  
> ❌ **Do NOT run `20260507_rbac.sql`** on a fresh database. It is a legacy `ALTER TABLE` patch for pre-RBAC installs. `schema.sql` already includes the `role` and `instructor_id` columns. Running the patch on a fresh DB will throw `Duplicate column` and `Duplicate key` errors.

### Option A — Single combined file *(recommended)*

Run the pre-merged file that applies schema + all seed data in one shot:

```bash
mysql -h <host> -P <port> -u <user> -p < learnify_full_setup.sql
```

### Option B — Step by step

```bash
# Step 1 — Create database and all tables
mysql -h <host> -P <port> -u <user> -p \
  < backend/migrations/schema.sql

# Step 2 — Seed courses, sections, and videos
mysql -h <host> -P <port> -u <user> -p lms_db \
  < backend/migrations/seed.sql

# Step 3 — Create demo instructor accounts and attach courses
mysql -h <host> -P <port> -u <user> -p lms_db \
  < backend/migrations/seed_instructor_courses.sql
```

### Demo Instructor Credentials

All 5 demo instructor accounts share the same password:

| Name | Email | Password |
|------|-------|----------|
| Maya Chen | maya.chen@learnify.dev | `LearnifyDemo123!` |
| Noah Patel | noah.patel@learnify.dev | `LearnifyDemo123!` |
| Sofia Ramirez | sofia.ramirez@learnify.dev | `LearnifyDemo123!` |
| Liam Okafor | liam.okafor@learnify.dev | `LearnifyDemo123!` |
| Emma Johnson | emma.johnson@learnify.dev | `LearnifyDemo123!` |

### Schema Overview

```
users              — id · email · password_hash · name · role(STUDENT|INSTRUCTOR)
subjects           — id · name · description · thumbnail_url · instructor_id → users
sections           — id · subject_id → subjects · title · order_index
videos             — id · section_id → sections · title · description · video_url · duration_seconds · order_index
enrollments        — id · user_id → users · subject_id → subjects  [UNIQUE user+subject]
video_progress     — id · user_id → users · video_id → videos · last_watched_seconds · completed  [UNIQUE user+video]
refresh_tokens     — id · user_id → users · token · expires_at
```

---

## 🔑 Environment Variables

Copy the example file and fill in your values:

```bash
cp backend/.env.example backend/.env
```

```env
# ── Server ──────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MySQL / TiDB Cloud ──────────────────────────────────
DATABASE_URL=mysql://<username>:<password>@<host>:<port>/lms_db?ssl=true
DB_HOST=<host>
DB_PORT=4000
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=lms_db
DB_SSL=true

# ── JWT ─────────────────────────────────────────────────
JWT_SECRET=replace_with_a_long_random_secret_min_32_chars
JWT_REFRESH_SECRET=replace_with_another_long_random_secret_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ── CORS ────────────────────────────────────────────────
CLIENT_URL=http://localhost:3000
```

> 🔒 Never commit `.env` files or real secrets to version control. Add `.env` to `.gitignore`.

---

## ▶️ Running the App

### Development

```bash
# Terminal 1 — backend API (http://localhost:5000)
cd backend && npm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd frontend && npm run dev
```

### Production build (frontend)

```bash
cd frontend
npm run build
npm start
```

---

## 📡 API Reference

**Live Base URL:** `https://learnify-lms-sxra.onrender.com/api`  
**Local Base URL:** `http://localhost:5000/api`

### 🔑 Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/register` | Public | Register as `STUDENT` or `INSTRUCTOR`. Returns access + refresh tokens. |
| `POST` | `/auth/login` | Public | Login with email + password. Returns access + refresh tokens. |
| `POST` | `/auth/refresh` | Public | Rotate refresh token. Returns new access token + public user payload. |
| `POST` | `/auth/logout` | Authenticated | Revoke refresh token from DB. |

### 📚 Subjects / Courses

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/subjects` | Public / optional auth | List all courses. Includes `is_enrolled` flag when authenticated. |
| `GET` | `/subjects/enrolled` | Student | Enrolled courses with per-course progress summary. |
| `POST` | `/subjects/:subjectId/enroll` | Student | Enroll the authenticated student in a course. |
| `GET` | `/subjects/:subjectId/sections` | Authenticated | Course sections + lesson list with progress state and sequential unlock logic. |

### 🧑‍🏫 Instructor Course Management

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/subjects/instructor/dashboard` | Instructor | Dashboard analytics: owned courses, total lessons, enrollments, completions. |
| `POST` | `/subjects` | Instructor | Create a new course (auto-assigns `instructor_id` from JWT). |
| `PUT` | `/subjects/:subjectId` | Instructor (owner) | Update course metadata. |
| `DELETE` | `/subjects/:subjectId` | Instructor (owner) | Delete course and cascade-delete sections, videos, enrollments, and progress. |
| `GET` | `/subjects/:subjectId/students` | Instructor (owner) | List enrolled students with per-lesson completion status. |
| `POST` | `/subjects/:subjectId/sections` | Instructor (owner) | Create a new section/module. |
| `PUT` | `/subjects/sections/:sectionId` | Instructor (owner) | Update section title or order. |
| `DELETE` | `/subjects/sections/:sectionId` | Instructor (owner) | Delete section and cascade-delete its videos. |
| `POST` | `/subjects/sections/:sectionId/videos` | Instructor (owner) | Add a video lesson to a section. |
| `PUT` | `/subjects/videos/:videoId` | Instructor (owner) | Update video metadata. |
| `DELETE` | `/subjects/videos/:videoId` | Instructor (owner) | Delete a video lesson. |

### 🎬 Video Progress

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/videos/:videoId/progress` | Student | Get current user's watch position and completion state for a video. |
| `POST` | `/videos/:videoId/progress` | Student | Upsert watch position (`last_watched_seconds`) and `completed` flag. |

---

## 🎨 Frontend Notes

### Dashboard Routing

| Route | Behaviour |
|-------|-----------|
| `/dashboard` | Reads role from auth cookie → redirects to `/dashboard/student` or `/dashboard/instructor` |
| `/dashboard/student` | Protected — redirects unauthenticated users to `/login`; blocks `INSTRUCTOR` role |
| `/dashboard/instructor` | Protected — redirects unauthenticated users to `/login`; blocks `STUDENT` role |

Route protection is handled by `frontend/middleware.js` using the JWT cookie set on login.

### Reusable Hero Section

A polished TypeScript hero component ships at:

```
frontend/components/home/HeroSection.tsx
```

Features included:
- Animated typing text with blinking cursor
- Framer Motion staggered entrance animations
- Floating gradient blob background
- Glassmorphism dashboard preview panel
- Fully responsive Tailwind-only layout

**Install peer dependency before importing:**

```bash
cd frontend && npm install framer-motion
```

**Usage:**

```tsx
import HeroSection from '../components/home/HeroSection';

export default function HomePage() {
  return <HeroSection />;
}
```

---

## 🧪 Useful Scripts

### Backend

```bash
cd backend

npm run dev      # Start with nodemon (auto-reload)
npm start        # Start in production mode
```

> `package.json` also exposes `migrate` and `seed` npm script entries. If using them, ensure the corresponding shell commands point to the SQL files, or run the SQL manually as shown in [Database Setup](#-database-setup).

### Frontend

```bash
cd frontend

npm run dev      # Start Next.js dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm start        # Start production server (after build)
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# 1. Fork the repository on GitHub

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit with a conventional message
git commit -m "feat: add your feature"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request against main
```

Please use clear, descriptive commit messages. Prefer atomic commits scoped to a single change.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) — see the `LICENSE` file for details.

---

## 👨‍💻 Author

**Abhinav KG**

[![GitHub](https://img.shields.io/badge/GitHub-@AbhinavKG27-181717?style=flat-square&logo=github)](https://github.com/AbhinavKG27)

---

<div align="center">

Made with ❤️ for learners everywhere.

[![Frontend](https://img.shields.io/badge/🌐%20Try%20It%20Live-learnify--lms--eight.vercel.app-6366f1?style=for-the-badge)](https://learnify-lms-eight.vercel.app)

</div>