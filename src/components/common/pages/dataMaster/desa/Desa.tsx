import React, { useState } from "react";
import { DesaTable } from "@components/common/organisms";
import { Link } from "react-router-dom";

import { useGetDesa } from "@hooks/api";

export const Desa: React.FC = () => {
  const [filter] = useState({
    orderBy: "ASC",
    page: 1,
    limit: 100,
  });
  const { data: desa } = useGetDesa(filter);
  console.log(desa, "desa");

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-end mb-2 mr-2">
        <Link
          to={"/desa/tambah"}
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
        >
          + Tambah
        </Link>
      </div>
      <div className="p-4">
        <DesaTable daerah={desa?.data} />
      </div>
    </div>
  );
};
