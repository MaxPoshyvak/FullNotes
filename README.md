# 📓 FullNotes — Personal Notes Manager

FullNotes is a full-stack web application that allows users to create, manage, and store personal notes.  
Each user has private access to their notes after authentication.  
Designed with modern technologies: **Next.js + Express + MongoDB + NextAuth + JWT**.

---

## 🚀 Features (Current)

- 🔐 User authentication with **NextAuth (Credentials provider)**
- 🔑 JWT handling & protected API routes on backend
- 🗂️ Personal notes stored in MongoDB
- 💾 Create & delete notes
- 🎨 Clean UI with React & TailwindCSS

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js, React, TailwindCSS, NextAuth |
| **Backend** | Node.js, Express, bcrypt, JWT |
| **Database** | MongoDB + Mongoose |
| **Auth** | NextAuth (JWT strategy), token validation with middleware |


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Project
```bash
git clone https://github.com/YOUR_USERNAME/fullnotes.git
cd fullnotes
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm/yarn/bun/pnpm install
```
Create .env.local:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_jwt_secret
```
Run backend:
```bash
npm/yarn/bun/pnpm run dev
```

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```
Create .env.local:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=https://backend.link.example
```
Run frontend:
```bash
npm/yarn/bun/pnpm run dev
```

---

###🔐 Authentication Overview

User Registration:
```bash
POST /api/auth/register
{
  "email": "test@gmail.com",
  "password": "password123",
  "username": "john"
}
```
Login:
```bash
POST /api/auth/login
→ returns JWT token (used in Authorization header)
```

