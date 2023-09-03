import React from "react";
import { AvatarButton, PullDownItemButton } from "@components/common/atoms";

export const HeaderRight: React.FC = () => {
  return (
    <div className="flex items-center gap-6">
      <div
        className="flex items-center gap-3"
        style={{ position: "relative", zIndex: "1" }}
      >
        <AvatarButton>
          <PullDownItemButton label="Profile" />
          <PullDownItemButton label="Change Password" />
          <PullDownItemButton label="Logout" />
        </AvatarButton>
      </div>
    </div>
  );
};
