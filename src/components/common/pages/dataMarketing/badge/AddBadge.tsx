import React, { useState } from "react";
import { usePostBadge } from "@hooks/api";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const AddBadge: React.FC = () => {
  const navigate = useNavigate();
  const [dataBadge, setDataBadge] = useState<any>({});

  const onSubmit = () => {
    usePostBadge(dataBadge)
      .then((res) => {
        toast.success(res.meta.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.meta.message);
      });
  };

  return (
    <>
      <div className="bg-white p-4" style={{ borderRadius: "10px" }}>
        <div className="flex space-x-4 justify-end mb-2">
          <Button onClick={() => navigate(-1)}>Kembali</Button>
          <Button htmlType="submit" onClick={() => onSubmit()}>
            Submit
          </Button>
        </div>
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          initialValues={{ size: "large" }}
          size="large"
        >
          <div className="flex">
            <div className="w-1/2 pr-4">
              <Form.Item label="Nama" name="name" rules={[{ required: true }]}>
                <Input
                  defaultValue={dataBadge?.name}
                  onChange={(e: any) =>
                    setDataBadge({ ...dataBadge, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Harga"
                name="price"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataBadge?.price}
                  onChange={(e: any) =>
                    setDataBadge({ ...dataBadge, price: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item label="Keterangan" name="description">
                <Input
                  defaultValue={dataBadge?.description}
                  onChange={(e: any) =>
                    setDataBadge({
                      ...dataBadge,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Gambar" name="image">
                <Input
                  defaultValue={dataBadge?.image}
                  onChange={(e: any) =>
                    setDataBadge({
                      ...dataBadge,
                      image: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <Toaster />
    </>
  );
};
