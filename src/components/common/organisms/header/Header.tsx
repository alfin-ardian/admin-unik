import React from "react";
import { HeaderRight } from ".";

interface Props {
  collapse?: boolean;
  breadcrumb?: string[];
}

export const Header: React.FC<Props> = ({ breadcrumb, collapse }) => {
  return (
    <header
      className="header bg-white flex items-center"
      style={{ marginLeft: collapse ? "14rem" : "12rem" }}
    >
      <div className="inner px-4 lg:px-5 flex flex-1 justify-between items-center">
        Menu / {breadcrumb}
      </div>
      <HeaderRight />
    </header>
  );
};
