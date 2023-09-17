import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetProvinces } from "@hooks/api";

interface Props {
  setProvinces: React.Dispatch<React.SetStateAction<any>>;
  provinces: any;
  disabled?: boolean;
}
export const SelectProvinces: React.FC<Props> = ({
  setProvinces,
  provinces,
  disabled,
}) => {
  const dataProvinces = useGetProvinces();
  const options: SelectProps["options"] = [];
  dataProvinces?.data?.map((item: any) => {
    options.push({ value: item.name, label: item.name, code: item.code });
  });

  const handleChangeProvince = (value: string, e: any) => {
    setProvinces({ name: value, province_code: e.code });
  };

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Pilih Provinsi"
      onChange={handleChangeProvince}
      options={options}
      disabled={disabled}
      defaultValue={provinces?.name}
    />
  );
};
