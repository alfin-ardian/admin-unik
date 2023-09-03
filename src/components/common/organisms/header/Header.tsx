import React from "react";

interface Props {
  onClick: () => void;
}
export const Header: React.FC<Props> = () => {
  return (
    <header className="header bg-white flex items-center">
      <div className="inner px-4 lg:px-8 flex flex-1 justify-between items-center">
        header
      </div>
    </header>
  );
};
