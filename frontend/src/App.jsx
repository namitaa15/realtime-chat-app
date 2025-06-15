import React, { useState, useRef } from "react";
import UsernameInput from "./components/UsernameInput";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const handleLogin = (name) => {
    setUsername(name);

    // WebSocket connect
    ws.current = new window.WebSocket("ws://localhost:5001");
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: "join", username: name }));
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "message") {
        setMessages((prev) => [...prev, data]);
      }
    };
  };

  const sendMessage = (msg) => {
    if (ws.current && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify({ type: "message", message: msg }));
    }
  };

  return (
    <div className="app-container">
      <div className="heading-main">Real-Time Chat App</div>
      {!username ? (
        <UsernameInput onLogin={handleLogin} />
      ) : (
        <>
          <h2 style={{ textAlign: "center", color: "#2a4156", margin: "0 0 18px 0" }}>
            Welcome, {username}!
          </h2>
          <ChatWindow messages={messages} />
          <MessageInput onSend={sendMessage} />
        </>
      )}
    </div>
  );
}

export default App;
