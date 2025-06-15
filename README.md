# 💬 Real-Time Chat App

A real-time group chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **WebSocket**.

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder:

```env
MONGO_URI=your-mongodb-uri
PORT=5001
```

Start the backend server:

```bash
node server.js
```

- **Backend URL:** `http://localhost:5001`  
- **WebSocket URL:** `ws://localhost:5001`

---

### 2. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

- **Frontend URL:** `http://localhost:5173` (Vite default)

---

## 🌐 Deployment

- **Backend (Render):**  
  https://realtime-chat-app-mktv.onrender.com

- **Frontend (Vercel):**  
  https://realtime-chat-app-puce-kappa.vercel.app


---

## 💡 How It Works

1. User enters a username to join the group chat.  
2. Frontend connects to the backend via WebSocket.  
3. Last 50 messages are loaded as chat history.  
4. New messages are broadcast to all connected clients in real-time.  
5. All messages are saved in MongoDB.
