const Message = require("../models/Message");

// 📨 Get last 50 chat messages
const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();
    res.status(200).json(messages.reverse());
  } catch (error) {
    console.error("❌ Error fetching chat history:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getChatHistory };