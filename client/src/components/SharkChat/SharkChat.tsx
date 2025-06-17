import React, { useEffect, useRef, useState } from "react";
import { getMockMessages, sendMockMessage, Message } from "./mockMessage";
import "./terminalChat.css";

const MAX_MESSAGES = 50;

export default function SharkChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getMockMessages().slice(-MAX_MESSAGES));
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMockMessage(input.trim());
      setMessages(getMockMessages().slice(-MAX_MESSAGES));
      setInput("");
    }
  };

  return (
    <div className="terminal-chat-container">
      <div className="terminal-chat-window" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className="terminal-chat-message">
            <span className="terminal-chat-username">{msg.username}:</span> {msg.text}
          </div>
        ))}
      </div>
      <form className="terminal-chat-input-row" onSubmit={handleSend}>
        <span className="terminal-chat-prompt">&gt;</span>
        <input
          className="terminal-chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความแล้วกด Enter..."
          autoFocus
        />
      </form>
    </div>
  );
}
