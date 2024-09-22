import React from "react";
import Image from "next/image";

import onlineIcon from "@/../public/assets/onlineIcon.png";
import closeIcon from "@/../public/assets/closeIcon.png";

import "./InfoBar.css";

function InfoBar({ room }: { room: string }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <Image className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
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
