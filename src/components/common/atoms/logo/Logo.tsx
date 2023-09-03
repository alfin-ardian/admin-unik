import React from "react";
import logo from "@assets/logos/logo-small.png";
import logoText from "@assets/logos/logo-text.png";

export const Logo: React.FC = () => {
  return (
    <a href="#" className="logo flex items-center relative">
      <img
        className="icon-1 left-0 top-0 w-12 h-12 absolute"
        src={logo}
        alt="logo"
      />
      <img
        className="icon-2 h-12 top-0 left-0 w-full absolute"
        src={logoText}
        alt="logo"
      />
    </a>
  );
};
