import React from "react";
import Image from "next/image";

import onlineIcon from "@/../public/assets/onlineIcon.png";

import "./TextContainer.css";

import type { User } from "@/types";

function TextContainer({ users }: { users: User[] }) {
  return (
    <div className="textContainer">
      <div>
        <h1>
          실시간 채팅 프로그램{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h2>
          똑같은 문구를 보낼 수 없습니다.
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h2>
        <h2>
          간단히 구현한 것으로 문제가 많습니다.
          <span role="img" aria-label="emoji">
            ⬅️
          </span>
        </h2>
      </div>
      {users ? (
        <div>
          <h1>현재 채팅중인 사람들 : </h1>
          <div className="activeContainer">
            <h2>
              {users.map(({ name }: { name: string }) => (
                <div key={name} className="activeItem">
                  {name}
                  <Image alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TextContainer;
