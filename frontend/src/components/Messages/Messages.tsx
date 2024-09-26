import React from "react";

import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

import "./Messages.css";

import type { Message as Msg } from "@/types";

type Props = {
  messages: Msg[];
  name: string;
};

function Messages({ messages, name }: Props) {
  return (
    <BasicScrollToBottom className="messages">
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </BasicScrollToBottom>
  );
}

export default Messages;
