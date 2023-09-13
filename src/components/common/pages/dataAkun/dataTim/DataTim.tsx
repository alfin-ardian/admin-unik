import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTim } from "@hooks/api";
import { TimTable } from "@components/common/organisms";

export const DataTim: React.FC = () => {
  const [filter] = useState({
    is_approved: true,
  });
  const { data: kelompok } = useGetTim(filter);

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-end p-4">
        <Link
          to={"/data/tim-pernikahan/tambah"}
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
        >
          + Tambah
        </Link>
      </div>
      <div className="p-4">
        <TimTable kelompok={kelompok?.data} />
      </div>
    </div>
  );
};
