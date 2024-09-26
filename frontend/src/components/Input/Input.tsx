import React, { FormEvent } from "react";

import "./Input.css";

type Props = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (event: FormEvent<HTMLFormElement>) => void;
};

const Input = ({ setMessage, sendMessage, message }: Props) => (
  <form onSubmit={sendMessage} className="form">
    <input
      className="input"
      type="text"
      placeholder="전송하려는 메시지를 입력하세요."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
    />
    <button type="submit" className="sendButton">
      전송
    </button>
  </form>
);

export default Input;
