import React from "react";
import { SidebarMenuList } from "..";
// import { Logo } from "@components/common/atoms";

interface Props {
  onClick: () => void;
  collapse?: boolean;
}

export const Sidebar: React.FC<Props> = ({ onClick, collapse }) => {
  return (
    <aside className="sidebar fixed overflow-y-auto bottom-0 left-0 top-0 bg-white">
      <div className="inner px-4 pt-4 pb-8 text-center">
        {/* <Logo /> */}
        <div className="logo" onClick={() => onClick()}>
          Jodoh
        </div>
        <div className="mt-16">
          <SidebarMenuList collapse={collapse} />
        </div>
      </div>
    </aside>
  );
};
