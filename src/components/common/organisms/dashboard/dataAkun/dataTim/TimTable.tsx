import type { InputRef } from "antd";
import { useDelDesa } from "@hooks/api";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import toast, { Toaster } from "react-hot-toast";

interface DataType {
  id: string;
  name: string;
  city: string;
  leader: string;
  staff: string;
  whatsapp_staff: string;
}

type DataIndex = keyof DataType;
interface Props {
  kelompok: any;
}
export const TimTable: React.FC<Props> = ({ kelompok }) => {
  const navigate = useNavigate();
  const dataNew: DataType[] = kelompok?.map((item: any) => ({
    id: item._id,
    daerah: item.daerah,
    desa: item.desa,
    name: item.name,
    description: item.description,
    leader: item.leader,
    whatsapp_leader: item.whatsapp_leader,
    vice_leader: item.vice_leader,
    whatsapp_vice_leader: item.whatsapp_vice_leader,
    staff: item.staff,
    whatsapp_staff: item.whatsapp_staff,
    vice_staff: item.vice_staff,
    whatsapp_vice_staff: item.whatsapp_vice_staff,
    province: item.province,
    city: item.city,
    district: item.district,
    address: item.address,
    latitude: item.latitude,
    longitude: item.longitude,
  }));
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const onDeleteData = (id: string) => {
    useDelDesa(id)
      .then((res) => {
        toast.success(res.meta.message);
        setTimeout(() => {
          navigate(0);
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
      render: (value, record, index) => (
        <Space key={index} accessKey={value} itemID={record.id}>
          <span>{index + 1}</span>
        </Space>
      ),
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Whatsapp",
      dataIndex: "city",
      key: "city",
      ...getColumnSearchProps("city"),
      sorter: (a, b) => a.city.length - b.city.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Daerah",
      dataIndex: "leader",
      key: "leader",
      ...getColumnSearchProps("leader"),
      sorter: (a, b) => a.leader.length - b.leader.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Desa",
      dataIndex: "staff",
      key: "staff",
      ...getColumnSearchProps("staff"),
    },
    {
      title: "Kelompok",
      dataIndex: "whatsapp_staff",
      key: "whatsapp_staff",
      ...getColumnSearchProps("whatsapp_staff"),
      sorter: (a, b) => a.whatsapp_staff.length - b.whatsapp_staff.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Aksi",
      dataIndex: "city",
      key: "city",
      render: (value, record, index) => (
        <Space key={index}>
          <Button onClick={() => navigate("/desa/detail", { state: record })}>
            Detail
          </Button>
          <Button danger value={value} onClick={() => onDeleteData(record.id)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataNew} />
      <Toaster />
    </>
  );
};
