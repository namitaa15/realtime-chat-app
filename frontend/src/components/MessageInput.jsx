import React, { useState } from "react";

function MessageInput({ onSend }) {
  const [msg, setMsg] = useState("");

  return (
    <form
      className="message-input-form"
      onSubmit={e => {
        e.preventDefault();
        if (msg.trim()) {
          onSend(msg);
          setMsg("");
        }
      }}
    >
      <input
        className="message-input-box"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="send-btn" type="submit">
        Send
      </button>
    </form>
  );
}

export default MessageInput;