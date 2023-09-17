import { useGetTim } from "@hooks/api";
import React, { useState } from "react";
import { TimTable } from "@components/common/organisms";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const CalonTim: React.FC = () => {
  const navigate = useNavigate();
  const [filter] = useState({
    is_approved: false,
  });
  const { data: pengurus } = useGetTim(filter);

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-end p-4">
        <Button
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
          onClick={() => navigate(location.pathname + "/tambah")}
        >
          + Tambah
        </Button>
      </div>
      <div className="p-4">
        <TimTable kelompok={pengurus?.data} />
      </div>
    </div>
  );
};
