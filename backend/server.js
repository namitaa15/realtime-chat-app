require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const setupWebSocketServer = require("./websocket/wsServer");
const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(cors());
app.use(express.json());const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🎉 Realtime Chat App Backend is Running!");
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Start WebSocket server
setupWebSocketServer(server);

// ✅ Start Express + WebSocket on same port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});