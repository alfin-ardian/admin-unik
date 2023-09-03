import React from "react";
import { useMatch } from "react-router-dom";
import { SidebarMenuListing } from "@components/common/molecules";
import { DashboardIcon } from "@components/common/atoms";

interface Props {
  collapse?: boolean;
}

export const SidebarMenuList: React.FC<Props> = ({ collapse }) => {
  const isRoot = useMatch("/") !== null;

  return (
    <div className="grid gap-2">
      <SidebarMenuListing
        to={"/"}
        label="Dashboard"
        active={isRoot}
        collapse={collapse}
        icon={<DashboardIcon />}
      />
      <p className="title">Data Master</p>
    </div>
  );
};
