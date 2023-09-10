import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetKelompok } from "@hooks/api";
import { KelompokTable } from "@components/common/organisms";

export const Kelompok: React.FC = () => {
  const [filter] = useState({
    orderBy: "ASC",
    page: 1,
    limit: 100,
  });
  const { data: kelompok } = useGetKelompok(filter);

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-end mb-2 mr-2">
        <Link
          to={"/kelompok/tambah"}
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
        >
          + Tambah
        </Link>
      </div>
      <div className="p-4">
        <KelompokTable kelompok={kelompok?.data} />
      </div>
    </div>
  );
};
