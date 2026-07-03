# 📚 StudyAI Hub

> **An AI-powered study companion that transforms PDFs into summaries, quizzes, and organized notes.**

StudyAI Hub is a full-stack MERN application designed to simplify the learning process. Users can upload study material, organize notes, generate AI-powered summaries, create quizzes, and revise efficiently using Google Gemini AI.

---

## 🌐 Live Demo

**Frontend:** https://study-ai-hub-psi.vercel.app/

**Backend API:** https://studyaihub-backend.onrender.com/

---

# ✨ Features

## 🔐 Authentication

- Secure JWT Authentication
- User Registration & Login
- Protected Routes
- Persistent User Sessions

---

## 📄 Notes Management

- Create Notes
- Edit Notes
- Delete Notes
- Search Notes
- Organize with Categories & Tags
- Responsive Notes Dashboard

---

## 📤 PDF Upload

- Upload Study Material
- Drag & Drop Interface
- Upload Progress Indicator
- PDF Validation
- Automatic Text Extraction

---

## 🤖 AI Features

### 🧠 AI Summary

Generate concise and easy-to-understand summaries from uploaded PDFs using **Google Gemini AI**.

### 📝 AI Quiz Generator

Generate multiple-choice quizzes from study notes with:

- Easy
- Medium
- Hard

Supports:

- Configurable Question Count
- Score Calculation
- Answer Explanations
- Quiz Regeneration

---

## 🎨 Modern UI

- Responsive Design
- Beautiful Authentication Pages
- Toast Notifications
- Upload Progress
- Clean Dashboard
- Dark Theme Support

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- React Dropzone

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- PDF Parsing

---

## AI

- Google Gemini 2.5 Flash API

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📂 Project Structure

```text
studyAIHub/

├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sharmaaryan8604/studyAIHub.git

cd studyAIHub
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

DB_CONNECT=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🚀 Application Workflow

```text
                    Upload PDF
                         │
                         ▼
                Extract PDF Text
                         │
                         ▼
                  Store in MongoDB
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   AI Summary                     AI Quiz
          │                             │
          ▼                             ▼
   Study Faster                Practice Better
```

---

# 🔒 Security

- JWT Authentication
- Protected API Routes
- Password Hashing using bcrypt
- Environment Variables
- CORS Protection

---

# 📈 Future Enhancements

- 🎴 AI Flashcards
- 💬 Chat with PDF (RAG)
- 🔊 Text-to-Speech Revision
- 📊 Study Analytics Dashboard
- 📄 Export Summary as PDF
- 🖼 OCR Support
- 📅 Smart Revision Planner

---

# 👨‍💻 Author

**Aryan Sharma**

- GitHub: https://github.com/sharmaaryan8604
- LinkedIn: https://www.linkedin.com/in/aryan-sharma-3a24b3258/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

---

# 📜 License
