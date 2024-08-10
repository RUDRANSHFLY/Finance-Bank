import React from "react";
import { HeaderProps } from "../../../types";

const NavBar = ({ type, user, tiitle, subTitle }: HeaderProps) => {
  return (
    <div className={"navBar"}>
      <h1 className={"navBar-title"}>
        {tiitle}
        {type === "greeting" && (
          <span className={"text-bankGradient"}>&nbsp;{user}</span>
        )}
      </h1>
      <p className={"navBar-subTitle"}>{subTitle}</p>
    </div>
  );
};

export default NavBar;
