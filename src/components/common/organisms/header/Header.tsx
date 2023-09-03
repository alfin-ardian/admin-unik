import React from "react";

interface Props {
  collapse?: boolean;
}

export const Header: React.FC<Props> = ({ collapse }) => {
  return (
    <header
      className="header bg-white flex items-center"
      style={{ marginLeft: collapse ? "14rem" : "12rem" }}
    >
      <div className="inner px-4 lg:px-5 flex flex-1 justify-between items-center">
        Header hello wolrd...
      </div>
    </header>
  );
};
