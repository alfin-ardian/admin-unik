import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUser } from "@hooks/api";
import { TimTable } from "@components/common/organisms";

export const DataUser: React.FC = () => {
  const [filter] = useState({
    is_approved: true,
  });
  const { data: user } = useGetUser(filter);

  return (
    <div className="container bg-white" style={{ borderRadius: "10px" }}>
      <div className="flex justify-end p-4">
        <Link
          to={"/data/user/tambah"}
          className="flex items-center gap-1 text-white bg-sky-600 hover:bg-sky-700 font-medium border border-sky-600 px-4 py-2 rounded-lg"
        >
          + Tambah
        </Link>
      </div>
      <div className="p-4">
        <TimTable kelompok={user?.data} />
      </div>
    </div>
  );
};
