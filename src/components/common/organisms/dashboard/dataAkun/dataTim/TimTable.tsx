import type { InputRef } from "antd";
import { useDelTim } from "@hooks/api";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import React, { useRef, useState } from "react";
import { CheckCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import toast, { Toaster } from "react-hot-toast";

interface DataType {
  id: string;
  name: string;
  whatsapp: string;
  daerah: Object;
  desa: Object;
  kelompok: Object;
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
    kelompok: item.kelompok,
    name: item.name,
    title: item.title,
    username: item.username,
    whatsapp: item.whatsapp,
    email: item.email,
    is_approved: item.is_approved,
    description: item.description,
    attachments: item.attachments,
    last_login: item.last_login,
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
    useDelTim(id)
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
      dataIndex: "whatsapp",
      key: "whatsapp",
      ...getColumnSearchProps("whatsapp"),
      sorter: (a, b) => a.whatsapp.length - b.whatsapp.length,
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => (
        <Space key={index} accessKey={value} itemID={record.id}>
          <a href={`https://wa.me/${value}`} target="_blank">
            {value}
          </a>
        </Space>
      ),
    },
    {
      title: "Daerah",
      dataIndex: "daerah",
      key: "daerah",
      render: (value, record, index) => (
        <Space key={index} accessKey={value} itemID={record.id}>
          <span>{value?.name}</span>
        </Space>
      ),
    },
    {
      title: "Desa",
      dataIndex: "desa",
      key: "desa",
      render: (value, record, index) => (
        <Space key={index} accessKey={value} itemID={record.id}>
          <span>{value?.name}</span>
        </Space>
      ),
    },
    {
      title: "Kelompok",
      dataIndex: "kelompok",
      key: "kelompok",
      render: (value, record, index) => (
        <Space key={index} accessKey={value} itemID={record.id}>
          <span>{value?.name}</span>
        </Space>
      ),
    },
    {
      title: "Approve",
      dataIndex: "is_approved",
      key: "is_approved",
      render: (value, record, index) => (
        <Tag
          icon={
            <CheckCircleOutlined
              key={index}
              accessKey={value}
              itemID={record.id}
            />
          }
          color="success"
        >
          Iya
        </Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      width: "10%",
      render: (value, record, index) => (
        <Space key={index} accessKey={value} itemID={record.id}>
          <span>{value?.name}</span>
        </Space>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "action",
      key: "action",
      render: (value, record, index) => (
        <Space key={index}>
          <Button
            onClick={() =>
              navigate("/data/tim-pernikahan/detail", { state: record })
            }
          >
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
