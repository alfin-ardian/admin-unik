import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetRegencies } from "@hooks/api";

interface Props {
  setRegencies: React.Dispatch<React.SetStateAction<any>>;
  regencies: any;
}
export const SelectRegencies: React.FC<Props> = ({
  setRegencies,
  regencies,
}) => {
  const dataRegencies = useGetRegencies();
  const options: SelectProps["options"] = [];
  dataRegencies?.data?.map((item: any) => {
    if (item.province_code === regencies.province_code) {
      options.push({
        value: item.name,
        label: item.name,
        code: item.code,
        province_code: item.province_code,
      });
    }
  });

  const handleChangeRegencies = (value: string, e: any) => {
    setRegencies({ name: value });
  };

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Pilih Provinsi"
      onChange={handleChangeRegencies}
      options={options}
    />
  );
};
