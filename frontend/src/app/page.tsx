"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");

      const socket = io({
        path: "/api/socket",
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Connected to socket");
      });

      socket.on("message", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(socket);
    };

    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}
