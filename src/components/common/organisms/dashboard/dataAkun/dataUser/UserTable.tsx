import type { InputRef } from "antd";
import { useDelUser } from "@hooks/api";
import { useNavigate, useLocation } from "react-router-dom";
import Highlighter from "react-highlight-words";
import React, { useRef, useState } from "react";
import {
  CheckCircleOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import toast, { Toaster } from "react-hot-toast";

interface DataType {
  is_approved: any;
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

export const UserTable: React.FC<Props> = ({ kelompok }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dataNew: DataType[] = kelompok?.map((item: any) => ({
    id: item._id,
    name: item.name,
    dob: item.dob,
    is_approved: item.is_approved,
    whatsapp: item.whatsapp,
    email: item.email,
    daerah: item.daerah,
    desa: item.desa,
    kelompok: item.kelompok,
    province: item.province,
    city: item.city,
    district: item.district,
    address: item.address,
    staff_name: item.staff_name,
    tb: item.tb,
    bb: item.bb,
    biography: item.biography,
    hobbies: item.hobbies,
    jumlah_saudara: item.jumlah_saudara,
    anak_ke: item.anak_ke,
    last_education: item.last_education,
    instance_education: item.instance_education,
    major: item.major,
    ponpes: item.ponpes,
    is_mt: item.is_mt,
    is_hb: item.is_hb,
    is_sarjana: item.is_sarjana,
    work: item.work,
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
    useDelUser(id)
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
            record.is_approved ? (
              <CheckCircleOutlined
                key={index}
                accessKey={value}
                itemID={record.id}
              />
            ) : (
              <WarningOutlined
                key={index}
                accessKey={value}
                itemID={record.id}
              />
            )
          }
          color={record.is_approved ? "success" : "warning"}
        >
          {record?.is_approved ? "Sudah" : "Belum"}
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
              navigate(location.pathname + "/detail", { state: record })
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
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={dataNew}
          scroll={{ x: "max-content" }} />
      </div>
      <Toaster />
    </>
  );
};
