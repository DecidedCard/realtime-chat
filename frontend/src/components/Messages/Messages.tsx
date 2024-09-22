import React, { useEffect } from "react";

import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

import "./Messages.css";

type Props = {
  messages: string[];
  name: string;
};

function Messages({ messages, name }: Props) {
  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
