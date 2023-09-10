import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetKelompok } from "@hooks/api";
import React, { useEffect, useState } from "react";

interface Props {
  desa: any;
  setKelompok: React.Dispatch<React.SetStateAction<any>>;
  kelompok: any;
  disabled?: boolean;
}
export const SelectKelompok: React.FC<Props> = ({
  desa,
  setKelompok,
  kelompok,
  disabled,
}) => {
  const [filter] = useState({
    orderBy: "ASC",
    page: 1,
    limit: 100,
  });
  const dataKelompok = useGetKelompok(filter);
  const [dataKelompokState, setDataKelompokState] = useState<any>(
    dataKelompok?.data
  );

  const options: SelectProps["options"] = [];
  dataKelompokState?.data?.map((item: any) => {
    if (item.desa._id === desa._id) {
      options.push({ value: item.name, label: item.name, _id: item._id });
    }
  });

  const handleChangeDesa = (value: string, e: any) => {
    setKelompok({ name: value, _id: e._id });
  };

  useEffect(() => {
    setDataKelompokState(dataKelompok?.data);
  }, [dataKelompok]);

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Pilih Kelompok"
      onChange={handleChangeDesa}
      options={options}
      disabled={disabled}
      defaultValue={kelompok?.name}
    />
  );
};
