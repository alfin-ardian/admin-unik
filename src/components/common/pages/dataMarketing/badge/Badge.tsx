import React from "react";
import { Button } from "antd";
import { useGetBadge } from "@hooks/api";
import { useNavigate } from "react-router-dom";
import { BadgeTable } from "@components/common/organisms";

export const Badge: React.FC = () => {
  const navigate = useNavigate();
  const { data: badge } = useGetBadge();
  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-end p-4">
        <Button
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-5 py-5 rounded-lg"
          onClick={() => navigate(location.pathname + "/tambah")}
        >
          + Tambah
        </Button>
      </div>
      <div className="p-4">
        <BadgeTable badge={badge?.data} />
      </div>
    </div>
  );
};
