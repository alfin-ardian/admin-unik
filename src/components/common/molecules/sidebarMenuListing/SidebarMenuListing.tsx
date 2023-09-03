// import { ChevronDownIcon } from "@components/common/atoms";
import React from "react";
import { Link, type To } from "react-router-dom";

interface Props {
  icon?: React.ReactElement;
  label: string;
  active?: boolean;
  hasSubMenu?: boolean;
  isOpen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  to?: To;
  collapse?: boolean;
}

export const SidebarMenuListing: React.FC<Props> = ({
  icon,
  label,
  active = false,
  hasSubMenu = false,
  isOpen = false,
  onClick,
  to = "#",
  collapse,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`sidebar-menu-item ${
        collapse ? "py-2 px-3" : "py-2 pl-10"
      } hover:bg-RoseRed flex items-center justify-between  ${
        active ? "bg-white" : ""
      } flex rounded-md`}
    >
      <span className="w-6 h-6">{icon}</span>
      <div
        className="secondary flex justify-between items-center gap-2 flex-1"
        style={{ maxWidth: collapse ? "500px" : "" }}
      >
        <span className="whitespace-nowrap overflow-clip text-black text-xs inter">
          {label}
        </span>
        {hasSubMenu ? (
          <span
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            {/* <ChevronDownIcon /> */}
            icon
          </span>
        ) : null}
      </div>
    </Link>
  );
};
