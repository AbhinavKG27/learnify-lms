# Learnify LMS

A full-stack LMS built with:

- **Frontend:** Next.js (Pages Router) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MySQL

Core features include:

- Course catalog
- Enrollment flow
- Linear lesson locking/unlocking
- Video progress tracking (`video_progress`)
- JWT-based authentication
- Dark mode toggle with persisted theme

---

## Project Structure

```bash
lms/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── components/
    ├── hooks/
    ├── lib/
    ├── pages/
    ├── styles/
    ├── package.json
    ├── tailwind.config.js
    └── next.config.js