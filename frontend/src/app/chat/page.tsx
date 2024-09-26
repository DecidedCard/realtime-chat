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
    if (!name) return; // 이름이 없을 때는 실행하지 않음

    // 로그인 이벤트 등록
    socket.emit("login", name, (res: socketLoginRes) => {
      if (res.ok) {
        setUsers((prev) => {
          // 중복 사용자 제거
          if (prev.find((user) => user.name === res.data.name)) return prev;
          return [...prev, res.data];
        });
      }
    });

    // 사용자 정보 및 메시지 수신 핸들러
    const handleUser = (userDate: User) => {
      setUsers((prev) => {
        // 중복 사용자 제거
        if (prev.find((user) => user.name === userDate.name)) return prev;
        return [...prev, userDate];
      });
    };

    const handleMessage = (message: { user: User; chat: string }) => {
      setMessages((prev) => {
        if (
          prev.find(
            (prev) =>
              prev.text === message.chat && prev.user === message.user.name
          )
        )
          return prev;
        return [...prev, { user: message.user.name, text: message.chat }];
      });
    };

    // 소켓 이벤트 리스너 등록
    socket.on("user", handleUser);
    socket.on("message", handleMessage);

    // Cleanup: 컴포넌트가 언마운트될 때 기존 리스너 제거
    return () => {
      socket.off("user", handleUser);
      socket.off("message", handleMessage);
    };
  }, [name]); // name이 바뀔 때만 실행

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, (res: any) => {
        console.log(res);
      });
      setMessage(""); // 전송 후 메시지 초기화
    }
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
