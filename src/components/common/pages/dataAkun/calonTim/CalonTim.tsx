import { useGetTim } from "@hooks/api";
import React, { useState } from "react";
import { TimTable } from "@components/common/organisms";

export const CalonTim: React.FC = () => {
  const [filter] = useState({
    is_approved: false,
  });
  const { data: pengurus } = useGetTim(filter);

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="p-4">
        <TimTable kelompok={pengurus?.data} />
      </div>
    </div>
  );
};
