import React from "react";
import Image from "next/image";

import onlineIcon from "@/../public/assets/onlineIcon.png";
import closeIcon from "@/../public/assets/closeIcon.png";

import "./InfoBar.css";

function InfoBar() {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <Image className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>실시간 채팅 테스트</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/join">
          <Image src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
}

export default InfoBar;
