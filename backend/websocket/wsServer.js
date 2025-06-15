const WebSocket = require("ws");
const Message = require("../models/Message");

const clients = new Map(); // socket => username

const setupWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (socket) => {
    console.log("🔗 New WebSocket connection");

    // Handle messages
    socket.on("message", async (data) => {
      try {
        const parsed = JSON.parse(data);

        // Step 1: Receive username
        if (parsed.type === "join") {
          clients.set(socket, parsed.username);

          // Step 2: Send last 50 messages
          const recentMessages = await Message.find({})
            .sort({ timestamp: -1 })
            .limit(50)
            .lean();

          socket.send(
            JSON.stringify({ type: "history", messages: recentMessages.reverse() })
          );
        }

        // Step 3: Receive new message
        if (parsed.type === "message") {
          const username = clients.get(socket);
          const newMessage = new Message({
            username,
            message: parsed.message,
          });

          await newMessage.save();

          const outMsg = {
            type: "message",
            username,
            message: parsed.message,
            timestamp: newMessage.timestamp,
          };

          // Step 4: Broadcast to all clients
          for (let client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(outMsg));
            }
          }
        }
      } catch (err) {
        console.error("❌ WebSocket Error:", err);
      }
    });

    socket.on("close", () => {
      console.log("❌ WebSocket disconnected");
      clients.delete(socket);
    });
  });

  console.log("✅ WebSocket server running");
};

module.exports = setupWebSocketServer;