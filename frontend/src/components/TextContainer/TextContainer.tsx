import React from "react";

import "./TextContainer.css";

function TextContainer() {
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
    </div>
  );
}

export default TextContainer;
