import React from "react";
import { DaerahTable } from "@components/common/organisms";
import { BreadcrumbComp } from "@components/common/atoms";
import { Link } from "react-router-dom";

export const Daerah: React.FC = () => {
  return (
    <div className="container mx-auto">
      <BreadcrumbComp page="Data Master" subPage="Data Daerah" />
      <div className="flex justify-end mb-2">
        <Link
          to={"/daerah/tambah-data"}
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
        >
          + Tambah
        </Link>
      </div>
      <DaerahTable />
    </div>
  );
};
