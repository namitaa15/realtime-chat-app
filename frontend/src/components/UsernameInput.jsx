import React, { useState } from "react";

function UsernameInput({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <div className="username-box">
      <h3>Enter your username</h3>
      <input
        className="username-input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type your name"
      />
      <button
        className="join-btn"
        onClick={() => name && onLogin(name)}
      >
        Join
      </button>
    </div>
  );
}

export default UsernameInput;