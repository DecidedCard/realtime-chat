"use client";

import React, { useState } from "react";
import Link from "next/link";

import "./join.css";

function Join() {
  const [name, setName] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"></h1>
        <div>
          <input
            placeholder="이름"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <Link
          onClick={(e) => (!name ? e.preventDefault() : null)}
          href={`/chat?name=${name}`}
        >
          <button className={"button mt-20"} type="submit">
            가입
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
