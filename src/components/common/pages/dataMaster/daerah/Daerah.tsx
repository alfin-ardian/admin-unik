import React, { useState } from "react";
import { DaerahTable } from "@components/common/organisms";
import { BreadcrumbComp } from "@components/common/atoms";
import { Link } from "react-router-dom";

import { useGetDaerah } from "@hooks/api";

export const Daerah: React.FC = () => {
  const [filter] = useState({
    orderBy: "ASC",
    page: 1,
    limit: 100,
  });
  const { data: daerah } = useGetDaerah(filter);

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-start ml-2">
        <BreadcrumbComp page="Data Master" subPage="Data Daerah" />
      </div>
      <div className="flex justify-end mb-2 mr-2">
        <Link
          to={"/daerah/tambah-data"}
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
        >
          + Tambah
        </Link>
      </div>
      <div className="p-4">
        <DaerahTable daerah={daerah?.data} />
      </div>
    </div>
  );
};
