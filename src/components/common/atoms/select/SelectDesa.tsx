import React, { useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetDesa } from "@hooks/api";

interface Props {
  setDesa: React.Dispatch<React.SetStateAction<any>>;
  desa: any;
  disabled?: boolean;
}
export const SelectDesa: React.FC<Props> = ({ setDesa, desa, disabled }) => {
  const [filter] = useState({
    orderBy: "ASC",
    page: 1,
    limit: 100,
  });
  const dataDesa = useGetDesa(filter);
  const [dataDesaState, setDataDesaState] = useState<any>({});

  const options: SelectProps["options"] = [];
  dataDesaState?.data?.map((item: any) => {
    options.push({ value: item.name, label: item.name, _id: item._id });
  });

  const handleChangeDesa = (value: string, e: any) => {
    setDesa({ name: value, _id: e._id });
  };

  useEffect(() => {
    setDataDesaState(dataDesa?.data);
  }, [dataDesa]);

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Pilih Desa"
      onChange={handleChangeDesa}
      options={options}
      disabled={disabled}
      defaultValue={desa?.name}
    />
  );
};
