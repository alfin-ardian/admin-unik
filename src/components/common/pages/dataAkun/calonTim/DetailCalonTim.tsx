import { usePutTim } from "@hooks/api";
import { Button, Form, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import {
  SelectDaerah,
  SelectDesa,
  SelectKelompok,
} from "@components/common/atoms";

export const DetailCalonTim: React.FC = () => {
  const navigate = useNavigate();
  const { state: dataTimDetail } = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataTim, setDataTim] = useState<any>(dataTimDetail);
  const [daerah, setDaerah] = useState<any>(dataTimDetail?.daerah);
  const [desa, setDesa] = useState<any>(dataTimDetail?.desa);
  const [kelompok, setKelompok] = useState<any>(dataTimDetail?.kelompok);

  useEffect(() => {
    setDataTim({
      ...dataTim,
      daerah: daerah,
      desa: desa,
      kelompok: kelompok,
    });
  }, [daerah, desa, kelompok]);

  const onUpdate = () => {
    usePutTim(dataTim)
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
          {isEdit ? (
            <>
              <Button onClick={() => setIsEdit(!isEdit)}>Batal</Button>
              <Button htmlType="submit" onClick={() => onUpdate()}>
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate(-1)}>Kembali</Button>
              <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
            </>
          )}
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
                <SelectDaerah
                  setDaerah={setDaerah}
                  daerah={daerah}
                  disabled={!isEdit}
                />
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
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item label="Nama" name="name" rules={[{ required: true }]}>
                <Input
                  defaultValue={dataTim?.name}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataTim({ ...dataTim, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Whatsapp"
                name="whatsapp"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataTim?.whatsapp}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataTim({
                      ...dataTim,
                      whatsapp: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Lampiran" name="attachments">
                <Input
                  defaultValue={dataTim?.attachments}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataTim({
                      ...dataTim,
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
                <SelectDesa
                  daerah={daerah}
                  setDesa={setDesa}
                  desa={desa}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item
                label="Dapukan"
                name="title"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataTim?.title}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataTim({
                      ...dataTim,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input
                  defaultValue={dataTim?.email}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataTim({
                      ...dataTim,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Keterangan" name="description">
                <Input
                  defaultValue={dataTim?.description}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataTim({
                      ...dataTim,
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
