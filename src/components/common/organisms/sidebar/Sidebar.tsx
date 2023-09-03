import React from "react";

interface Props {
  collapse?: boolean;
}
export const Sidebar: React.FC<Props> = () => {
  return (
    <aside className="sidebar fixed overflow-y-auto bottom-0 left-0 top-0 bg-darkPrimary">
      <div className="inner px-4 pt-4 pb-8">
        {/* <Logo /> */}
        logo
        <div className="mt-16">
          sidebar
          {/* <SidebarMenuList role={role} collapse={collapse} /> */}
        </div>
      </div>
    </aside>
  );
};
