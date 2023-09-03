import { Header } from "@components/common/organisms/header/Header";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export const RootView: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const onClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div id="root-view" className="shown min-h-screen font-inter">
        {/* <Sidebar collapse={collapsed} /> */}
        <Header onClick={onClick} />
        <div className="host p-8 min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};
