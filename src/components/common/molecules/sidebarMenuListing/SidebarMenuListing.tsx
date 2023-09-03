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
  const hasNoIcon = icon === undefined;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`sidebar-menu-item ${
        hasNoIcon ? "py-2 px-3" : "p-3"
      } hover:bg-darkGold flex items-center justify-between  ${
        active ? "bg-darkGold" : ""
      } flex rounded-md`}
    >
      {/* Icon is mandatory to shown */}
      <span className="w-6 h-6">{icon}</span>

      {/* Secondary shown */}
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
