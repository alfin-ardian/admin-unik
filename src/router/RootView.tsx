import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "@components/common/organisms";

export const RootView: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const onClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div id="root-view" className="shown min-h-screen font-inter">
        <Sidebar
          collapse={collapsed}
          onClick={onClick}
          setBreadcrumb={setBreadcrumb}
        />
        <Header collapse={collapsed} breadcrumb={breadcrumb} />
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
