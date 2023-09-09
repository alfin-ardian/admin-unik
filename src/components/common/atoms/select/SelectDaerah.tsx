import React, { useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetDaerah } from "@hooks/api";

interface Props {
  setDaerah: React.Dispatch<React.SetStateAction<any>>;
  daerah: any;
  disabled?: boolean;
}
export const SelectDaerah: React.FC<Props> = ({
  setDaerah,
  daerah,
  disabled,
}) => {
  const [filter] = useState({
    orderBy: "ASC",
    page: 1,
    limit: 100,
  });
  const dataDaerah = useGetDaerah(filter);
  const [dataDaerahState, setDataDaerahState] = useState<any>({});

  const options: SelectProps["options"] = [];
  dataDaerahState?.data?.map((item: any) => {
    options.push({ value: item.name, label: item.name, _id: item._id });
  });

  const handleChangeProvince = (value: string, e: any) => {
    setDaerah({ name: value, _id: e._id });
  };

  useEffect(() => {
    setDataDaerahState(dataDaerah?.data);
  }, [dataDaerah]);

  console.log(daerah, "daerah");
  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Pilih Daerah"
      onChange={handleChangeProvince}
      options={options}
      disabled={disabled}
      defaultValue={daerah?.name}
    />
  );
};
