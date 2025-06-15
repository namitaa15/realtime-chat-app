function ChatWindow({ messages }) {
    return (
      <div className="chat-window">
        {messages.length === 0 ? (
          <div style={{ color: "#888", textAlign: "center" }}>No messages yet.</div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message-bubble${i % 2 === 1 ? " alt" : ""}`}
            >
              <span className="message-username">{msg.username}:</span>
              <span className="message-text">{msg.message}</span>
              <span className="message-time">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString()
                  : ""}
              </span>
            </div>
          ))
        )}
      </div>
    );
  }
  export default ChatWindow;  