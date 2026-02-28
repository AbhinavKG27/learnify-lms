# 📚 learnify-LMS — Learning Management System

> A full-stack web application that enables seamless online learning, course management, and educational content delivery.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-97.4%25-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-2.6%25-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/AbhinavKG27/lms/pulls)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🔍 Overview

LMS is a full-stack Learning Management System designed to bridge the gap between instructors and learners. It provides a streamlined platform for course creation, enrollment, progress tracking, and content delivery — all in one place.

Whether you're an instructor building courses or a student working through learning materials, LMS delivers a clean and intuitive experience.

---

## ✨ Features

- 🔐 **Authentication & Authorization** — Secure sign-up/login with role-based access (Student, Instructor, Admin)
- 📚 **Course Management** — Create, update, and delete courses with rich content
- 🎓 **Student Enrollment** — Browse and enroll in available courses
- 📈 **Progress Tracking** — Monitor course completion and learning milestones
- 📁 **Media Uploads** — Support for course materials, videos, and documents
- 💬 **Interactive Learning** — Assignments, quizzes, and resource sharing
- 📱 **Responsive UI** — Mobile-friendly design for learning on the go

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| CSS | Styling |
| Axios | HTTP client |
| React Router | Client-side routing |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Multer | File uploads |
| dotenv | Environment configuration |

---

## 📁 Project Structure

```
lms/
├── backend/                  # Node.js + Express REST API
│   ├── config/               # Database & environment config
│   ├── controllers/          # Route handler logic
│   ├── middleware/           # Auth & error handling middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── utils/                # Helper functions
│   └── index.js              # Server entry point
│
├── frontend/                 # React.js client application
│   ├── public/               # Static assets
│   └── src/
│       ├── assets/           # Images & icons
│       ├── components/       # Reusable UI components
│       ├── context/          # React context providers
│       ├── pages/            # Page-level components
│       ├── routes/           # Protected & public routes
│       ├── services/         # API call abstraction
│       └── App.js            # Root component
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AbhinavKG27/lms.git
cd lms
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

---

### Environment Variables

Create a `.env` file inside the `backend/` directory and populate it with the following:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/lms

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Client Origin (for CORS)
CLIENT_URL=http://localhost:3000

# Cloudinary (optional — for media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

### Running the App

**Start the backend server**

```bash
cd backend
npm run dev
```

The API will be running at `http://localhost:5000`

**Start the frontend development server**

```bash
cd frontend
npm start
```

The app will be running at `http://localhost:3000`

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |
| `GET` | `/courses` | Fetch all available courses |
| `POST` | `/courses` | Create a new course (Instructor) |
| `GET` | `/courses/:id` | Get a single course by ID |
| `PUT` | `/courses/:id` | Update a course (Instructor) |
| `DELETE` | `/courses/:id` | Delete a course (Instructor) |
| `POST` | `/courses/:id/enroll` | Enroll in a course (Student) |
| `GET` | `/users/profile` | Get current user profile |

> Full API documentation coming soon via Postman/Swagger.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) spec for commit messages.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 👨‍💻 Author

**Abhinav KG**

- GitHub: [@AbhinavKG27](https://github.com/AbhinavKG27)

---

<p align="center">Made with ❤️ for learners everywhere</p>