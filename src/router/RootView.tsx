import { Header, Sidebar } from "@components/common/organisms";
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
        <Sidebar collapse={collapsed} onClick={onClick} />
        <Header collapse={collapsed} />
        <div
          className="pt-4"
          style={{ marginLeft: collapsed ? "14rem" : "12rem" }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};
