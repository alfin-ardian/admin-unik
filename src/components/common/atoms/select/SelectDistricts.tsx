import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetDistricts } from "@hooks/api";

interface Props {
  setDistricts: React.Dispatch<React.SetStateAction<any>>;
  districts: any;
  disabled?: boolean;
}
export const SelectDistricts: React.FC<Props> = ({
  setDistricts,
  districts,
  disabled,
}) => {
  const dataDistritcs = useGetDistricts();
  const options: SelectProps["options"] = [];
  dataDistritcs?.data?.map((item: any) => {
    if (item.regency_code === districts.regency_code) {
      options.push({
        code: item.code,
        value: item.name,
        label: item.name,
        regency_code: item.regency_code,
      });
    }
  });

  const handleChangeDistricts = (value: string, e: any) => {
    setDistricts({ name: value, regency_code: e.regency_code });
  };

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Pilih Kecamatan"
      onChange={handleChangeDistricts}
      options={options}
      disabled={disabled}
      defaultValue={districts?.name}
    />
  );
};
