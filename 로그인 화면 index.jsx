import React from "react";
import { Size48 } from "./Size48";
import iconGameControllerOutline from "./icon-game-controller-outline.png";
import rectangle3 from "./rectangle-3.svg";
import "./style.css";

export const Screen = () => {
  return (
    <div className="screen">
      <div className="div">
        <Size48 className="arrow-left" />
        <div className="overlap-group">
          <div className="text-wrapper">ID</div>
        </div>

        <div className="overlap">
          <div className="text-wrapper">Password</div>
        </div>

        <div className="overlap-2">
          <div className="text-wrapper-2">회원가입</div>

          <img className="rectangle" alt="Rectangle" src={rectangle3} />

          <div className="text-wrapper-3">Sign In</div>
        </div>

        <img
          className="icon-game-controller"
          alt="Icon game controller"
          src={iconGameControllerOutline}
        />
      </div>
    </div>
  );
};

