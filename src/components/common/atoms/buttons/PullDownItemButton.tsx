import React, { ReactNode } from "react";
import { Menu } from "@headlessui/react";

interface Props {
  on?: ReactNode;
  off?: ReactNode;
  label: string;
  onClick?: () => void;
}
export const PullDownItemButton: React.FC<Props> = ({
  on,
  off,
  label,
  onClick,
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active ? "bg-RoseRed text-white" : "text-gray-900"
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {active ? on : off}
          {label}
        </button>
      )}
    </Menu.Item>
  );
};
