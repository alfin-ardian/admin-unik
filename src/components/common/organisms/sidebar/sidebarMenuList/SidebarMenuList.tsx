import React from "react";
import { useMatch } from "react-router-dom";
import { SidebarMenuListing } from "@components/common/molecules";
import {
  DashboardIcon,
  UserIcon,
  StaffIcon,
  DaerahIcon,
  DesaIcon,
  KelompokIcon,
} from "@components/common/atoms";

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
      <p className="title mt-2 mb-2 border-t border-b p-4">Data Akun</p>
      <SidebarMenuListing
        to={"/"}
        label="Calon User"
        active={isRoot}
        collapse={collapse}
        icon={<UserIcon />}
      />
      <SidebarMenuListing
        to={"/"}
        label="Calon Tim "
        active={isRoot}
        collapse={collapse}
        icon={<StaffIcon />}
      />
      <SidebarMenuListing
        to={"/"}
        label="Data User"
        active={isRoot}
        collapse={collapse}
        icon={<UserIcon />}
      />
      <SidebarMenuListing
        to={"/"}
        label="Data Tim"
        active={isRoot}
        collapse={collapse}
        icon={<StaffIcon />}
      />
      <p className="title mt-2 border-t border-b p-4">Data Master</p>
      <SidebarMenuListing
        to={"/"}
        label="Data Daerah"
        active={isRoot}
        collapse={collapse}
        icon={<DaerahIcon />}
      />
      <SidebarMenuListing
        to={"/"}
        label="Data Desa"
        active={isRoot}
        collapse={collapse}
        icon={<DesaIcon />}
      />
      <SidebarMenuListing
        to={"/"}
        label="Data Kelompok"
        active={isRoot}
        collapse={collapse}
        icon={<KelompokIcon />}
      />
      <p className="title mt-2 border-t border-b p-4">Data Marketing</p>
      <SidebarMenuListing
        to={"/"}
        label="Data Iklan"
        active={isRoot}
        collapse={collapse}
        icon={<KelompokIcon />}
      />
    </div>
  );
};
