"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import socket from "@/util/server";

import InfoBar from "@/components/InfoBar/InfoBar";
import Messages from "@/components/Messages/Messages";
import Input from "@/components/Input/Input";
import TextContainer from "@/components/TextContainer/TextContainer";

import "./Chat.css";

const Chat = () => {
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const navigation = useRouter();

  const params = useSearchParams();

  const name = params.get("name");

  useEffect(() => {
    socket.emit("login", name, (res) => {
      console.log(res);
    });
  }, [name]);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages messages={messages} name={name!} />
        {/* <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        /> */}
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
