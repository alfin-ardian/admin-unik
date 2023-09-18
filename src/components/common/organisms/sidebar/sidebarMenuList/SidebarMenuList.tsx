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
  BadgeIcon,
  PesananIcon,
  AdsenseIcon,
} from "@components/common/atoms";

interface Props {
  collapse?: boolean;
  setBreadcrumb: React.Dispatch<React.SetStateAction<any>>;
}

export const SidebarMenuList: React.FC<Props> = ({
  setBreadcrumb,
  collapse,
}) => {
  // const
  const isRoot = useMatch("/") !== null;

  return (
    <div className="grid gap-2">
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/"}
        label="Dashboard"
        active={isRoot}
        collapse={collapse}
        icon={<DashboardIcon />}
      />
      <p className="title mt-2 mb-2 border-t border-b p-4">Data Akun</p>
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/calon/user"}
        label="Calon User"
        active={isRoot}
        collapse={collapse}
        icon={<UserIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/calon/tim-pernikahan"}
        label="Calon Tim"
        active={isRoot}
        collapse={collapse}
        icon={<StaffIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/data/user"}
        label="Data User"
        active={isRoot}
        collapse={collapse}
        icon={<UserIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/data/tim-pernikahan"}
        label="Data Tim"
        active={isRoot}
        collapse={collapse}
        icon={<StaffIcon />}
      />
      <p className="title mt-2 border-t border-b p-4">Data Master</p>
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/daerah"}
        label="Data Daerah"
        active={isRoot}
        collapse={collapse}
        icon={<DaerahIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/desa"}
        label="Data Desa"
        active={isRoot}
        collapse={collapse}
        icon={<DesaIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/kelompok"}
        label="Data Kelompok"
        active={isRoot}
        collapse={collapse}
        icon={<KelompokIcon />}
      />
      <p className="title mt-2 border-t border-b p-4">Data Marketing</p>
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/badge"}
        label="Badge"
        active={isRoot}
        collapse={collapse}
        icon={<BadgeIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/"}
        label="Pesanan"
        active={isRoot}
        collapse={collapse}
        icon={<PesananIcon />}
      />
      <SidebarMenuListing
        setBreadcrumb={setBreadcrumb}
        to={"/"}
        label="Posting Iklan"
        active={isRoot}
        collapse={collapse}
        icon={<AdsenseIcon />}
      />
    </div>
  );
};
