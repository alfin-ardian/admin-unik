import { usePostTim } from "@hooks/api";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import {
  SelectDaerah,
  SelectDesa,
  SelectKelompok,
} from "@components/common/atoms";

export const AddDataTim: React.FC = () => {
  const navigate = useNavigate();
  const [dataKelompok, setDataKelompok] = useState<any>({
    is_approved: true,
  });
  const [daerah, setDaerah] = useState<any>({});
  const [desa, setDesa] = useState<any>({});
  const [kelompok, setKelompok] = useState<any>({});

  useEffect(() => {
    setDataKelompok({
      ...dataKelompok,
      daerah: daerah,
      desa: desa,
      kelompok: kelompok,
    });
  }, []);

  const onSubmit = () => {
    usePostTim(dataKelompok)
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
              <Form.Item
                label="Pilih Daerah"
                name="daerah"
                rules={[{ required: true }]}
              >
                <SelectDaerah setDaerah={setDaerah} daerah={daerah} />
              </Form.Item>
              <Form.Item
                label="Pilih Kelompok"
                name="name"
                rules={[{ required: true }]}
              >
                <SelectKelompok
                  desa={desa}
                  setKelompok={setKelompok}
                  kelompok={kelompok}
                />
              </Form.Item>
              <Form.Item label="Nama" name="name" rules={[{ required: true }]}>
                <Input
                  defaultValue={dataKelompok?.name}
                  onChange={(e: any) =>
                    setDataKelompok({ ...dataKelompok, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Whatsapp"
                name="whatsapp"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataKelompok?.whatsapp}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      whatsapp: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input
                  type="password"
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Lampiran" name="attachments">
                <Input
                  defaultValue={dataKelompok?.attachments}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      attachments: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item
                label="Pilih Desa"
                name="desa"
                rules={[{ required: true }]}
              >
                <SelectDesa daerah={daerah} setDesa={setDesa} desa={desa} />
              </Form.Item>
              <Form.Item
                label="Dapukan"
                name="title"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataKelompok?.title}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataKelompok?.username}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input
                  defaultValue={dataKelompok?.email}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Konfirmasi Password"
                name="confirm_password"
                rules={[{ required: true }]}
              >
                <Input
                  type="password"
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      confirm_password: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Keterangan" name="description">
                <Input
                  defaultValue={dataKelompok?.description}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      description: e.target.value,
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
