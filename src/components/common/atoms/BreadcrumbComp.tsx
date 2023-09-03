import React from "react";
import { Breadcrumb } from "antd";

interface Props {
  page?: string;
  subPage?: string;
  routes?: [
    {
      name: string;
    }
  ];
  subRoutes?: [
    {
      name: string;
    }
  ];
}

export const BreadcrumbComp: React.FC<Props> = ({ page, subPage }) => {
  return (
    <Breadcrumb
      items={[
        {
          title: page,
        },
        {
          title: subPage,
        },
      ]}
    />
  );
};
