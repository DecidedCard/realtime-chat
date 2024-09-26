"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import socket from "@/util/server";

import InfoBar from "@/components/InfoBar/InfoBar";
import Messages from "@/components/Messages/Messages";
import Input from "@/components/Input/Input";
import TextContainer from "@/components/TextContainer/TextContainer";

import "./Chat.css";

import type { Message, socketLoginRes, User } from "@/types";

const Chat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const params = useSearchParams();

  const name = params.get("name");

  useEffect(() => {
    socket.emit("login", name, (res: socketLoginRes) => {
      if (res.ok) {
        setUsers((prev) => [...prev, res.data]);
      }
    });

    socket.on("message", (message) => {
      console.log(message);
      setMessages((prev) => [
        ...prev,
        { user: message.user.name, text: message.chat },
      ]);
    });
  }, [name]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("sendMessage", message, (res: any) => {
      console.log(res);
    });
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages messages={messages} name={name!} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
