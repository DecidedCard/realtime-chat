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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const params = useSearchParams();
  const name = params.get("name");

  useEffect(() => {
    if (!name) return; // 이름이 없을 때는 실행하지 않음

    // 로그인 이벤트 등록
    socket.emit("login", name, (res: socketLoginRes) => {
      console.log("유저가 로그인하였습니다.", res);
    });

    // 사용자 정보 및 메시지 수신 핸들러

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
    socket.on("message", handleMessage);

    // Cleanup: 컴포넌트가 언마운트될 때 기존 리스너 제거
    return () => {
      socket.off("message", handleMessage);
    };
  }, [name]); // name이 바뀔 때만 실행

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, (res: string) => {
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
      <TextContainer />
    </div>
  );
};

export default Chat;
