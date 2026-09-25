# FreeTalk — Real-Time Communication Platform

A full-stack real-time communication platform inspired by language-learning communities like Free4Talk. Users can create and join rooms, communicate in real time, and interact with other users.

🔗 **Live Demo:** https://freetalkusingsocket.vercel.app

## 🚀 Features

* 🔐 User Registration & Login with JWT Authentication
* 👤 User Profile Management
* 🏠 Create, Join & Leave Rooms
* 🔎 Search & Filter Rooms
* 💬 Real-Time Room Chat using Socket.IO
* 👥 Real-Time Room Events
* 💾 Persistent User & Room Data with MongoDB
* 🔒 Protected API Routes
* 🌐 Deployed Frontend & Backend

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Socket.IO Client
* CSS

### Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose
* JWT
* bcrypt
* CORS

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## 📂 Project Structure

```text
FreeTalk/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── socket/
    ├── utils/
    ├── app.js
    ├── server.js
    └── package.json
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yashkaledeveloper/Free-Talk---Real-Time-Room-Base-Communication-Platform.git
cd YOUR_REPOSITORY
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URI=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URI=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## 🔄 Application Flow

```text
Register / Login
       ↓
   User Profile
       ↓
   Browse Rooms
       ↓
 Search / Filter
       ↓
  Join a Room
       ↓
 Real-Time Chat
       ↓
 Leave Room
```

## 🔌 Real-Time Communication

Socket.IO is used for real-time communication between connected users.

The application handles events such as:

* User joining a room
* User leaving a room
* Sending messages
* Receiving messages
* Room member updates
* Socket disconnection

## 🔐 Environment Variables

Never commit your `.env` files to GitHub.

Required backend variables:

```env
MONGO_URI=
JWT_SECRET=
FRONTEND_URI=
PORT=
```

Required frontend variable:

```env
VITE_BACKEND_URI=
```

## 🎯 Learning & Development Focus

This project was built to gain practical experience with:

* MERN Stack Development
* REST API Design
* JWT Authentication
* WebSockets & Socket.IO
* Real-Time Communication
* MongoDB Data Modeling
* Frontend–Backend Integration
* Production Deployment

## 📌 Future Improvements

* 🎙️ WebRTC-based Voice Chat
* 👥 Friends & Follow System
* 💬 One-to-One Private Chat
* 🛡️ Room Admin Controls
* ⚡ Redis for Socket.IO Scaling
* 🐳 Docker & CI/CD
* 🤖 AI-powered communication features

## 👨‍💻 Author

**Your Name**

BTech Computer Science Engineering Student

Interested in Full-Stack Development, Real-Time Systems and AI Engineering.
