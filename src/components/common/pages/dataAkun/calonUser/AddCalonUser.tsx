import { usePostUser } from "@hooks/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import {
  SelectProvinces,
  SelectRegencies,
  SelectDistricts,
  SelectDaerah,
  SelectDesa,
  SelectKelompok,
} from "@components/common/atoms";

export const AddCalonUser: React.FC = () => {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState<any>({});
  const [regencies, setRegencies] = useState<any>({ province_code: "" });
  const [districts, setDistricts] = useState<any>({ regency_code: "" });
  const [dataCalonUser, setDataCalonUser] = useState<any>({
    is_approved: false,
  });
  const [daerah, setDaerah] = useState<any>({});
  const [desa, setDesa] = useState<any>({});
  const [kelompok, setKelompok] = useState<any>({});

  useEffect(() => {
    if (provinces.province_code) {
      setRegencies({ ...regencies, province_code: provinces.province_code });
    }
  }, [provinces]);

  useEffect(() => {
    if (regencies.regency_code) {
      setDistricts({ ...districts, regency_code: regencies.regency_code });
    }
  }, [regencies]);

  useEffect(() => {
    setDataCalonUser({
      daerah: daerah,
      desa: desa,
      kelompok: kelompok,
      provinces: provinces.name,
      city: regencies.name,
      districts: districts.name,
    });
  }, [daerah, desa, kelompok, provinces, regencies, districts]);

  const onUpdate = () => {
    usePostUser(dataCalonUser)
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
          <Button htmlType="submit" onClick={() => onUpdate()}>
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
                  placeholder="Nama Lengkap"
                  defaultValue={dataCalonUser?.name}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Tanggal Lahir"
                name="dob"
                rules={[{ required: true }]}
              >
                <Input
                  type="date"
                  defaultValue={dataCalonUser?.dob}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      dob: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Whatsapp"
                name="whatsapp"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ketik nomor whatsapp"
                  defaultValue={dataCalonUser?.whatsapp}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
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
                  placeholder="Ketik password"
                  type="password"
                  defaultValue={dataCalonUser?.password}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Pilih Daerah"
                name="daerah"
                rules={[{ required: true }]}
              >
                <SelectDaerah setDaerah={setDaerah} daerah={daerah} />
              </Form.Item>
              <Form.Item
                label="Pilih Kelompok"
                name="kelompok"
                rules={[{ required: true }]}
              >
                <SelectKelompok
                  setKelompok={setKelompok}
                  kelompok={kelompok}
                  desa={desa}
                />
              </Form.Item>
              <Form.Item label="Provinsi" name="province">
                <SelectProvinces
                  setProvinces={setProvinces}
                  provinces={provinces}
                />
              </Form.Item>
              <Form.Item label="Kecamatan" name="district">
                <SelectDistricts
                  setDistricts={setDistricts}
                  districts={districts}
                />
              </Form.Item>
              <Form.Item label="Tinggi Badan" name="tb">
                <Input
                  placeholder="Ketik tinggi badan (cm)"
                  defaultValue={dataCalonUser?.tb}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      tb: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Biography" name="biography">
                <Input
                  placeholder="Ketik tentang anda"
                  defaultValue={dataCalonUser?.biography}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      biography: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Jumlah Saudara" name="jumlah_saudara">
                <Input
                  placeholder="Berapa jumlah saudara anda"
                  defaultValue={dataCalonUser?.jumlah_saudara}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      jumlah_saudara: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Pendidikan Terakhir" name="last_education">
                <Input
                  placeholder="Pilih pendidikan terakhir anda"
                  defaultValue={dataCalonUser?.last_education}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      last_education: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Jurusan" name="major">
                <Input
                  placeholder="Ketik Jurusan"
                  defaultValue={dataCalonUser?.major}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      major: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Mubalight/ghot?" name="is_mt">
                <Input
                  placeholder="Apakah anda seorang mubalight / mubalighot"
                  defaultValue={dataCalonUser?.is_mt}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_mt: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Sarjana?" name="is_sarjana">
                <Input
                  placeholder="Apakah anda seorang sarjana"
                  defaultValue={dataCalonUser?.is_sarjana}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_sarjana: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Pilih jenis kelamin"
                  defaultValue={dataCalonUser?.gender}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      gender: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Keterangan"
                name="description"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ketik keterangan"
                  defaultValue={dataCalonUser?.description}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ketik email"
                  defaultValue={dataCalonUser?.email}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Konfirm Password"
                name="confirm_password"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ketik ulang password"
                  type="password"
                  defaultValue={dataCalonUser?.confirm_password}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      confirm_password: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Pilih Desa"
                name="desa"
                rules={[{ required: true }]}
              >
                <SelectDesa daerah={daerah} setDesa={setDesa} desa={desa} />
              </Form.Item>
              <Form.Item
                label="Tim Pernikahan Kelompok"
                name="staff_name"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Sebutkan nama tim pernikahan kelompok anda"
                  defaultValue={dataCalonUser?.staff_name}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      staff_name: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Kab / Kota" name="city">
                <SelectRegencies
                  setRegencies={setRegencies}
                  regencies={regencies}
                />
              </Form.Item>
              <Form.Item label="Alamat" name="address">
                <Input
                  placeholder="Ketik alamat lengkap"
                  defaultValue={dataCalonUser?.address}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Berat Badan" name="tb">
                <Input
                  placeholder="Ketik berat badan (kg)"
                  defaultValue={dataCalonUser?.tb}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      tb: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Hobbi" name="hobbies">
                <Input
                  placeholder="Ketik hobbi anda"
                  defaultValue={dataCalonUser?.hobbies}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      hobbies: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Anak Ke-" name="anak_ke">
                <Input
                  placeholder="Anak nomor berapa"
                  defaultValue={dataCalonUser?.anak_ke}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      anak_ke: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Sekolah / Universitas"
                name="instance_education"
              >
                <Input
                  placeholder="Ketik sekolah atau kampus"
                  defaultValue={dataCalonUser?.instance_education}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      instance_education: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Ponpes" name="ponpes">
                <Input
                  placeholder="Sebutkan nama pondok anda"
                  defaultValue={dataCalonUser?.ponpes}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      ponpes: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="HB?" name="is_hb">
                <Input
                  placeholder="Apakah anda khatam hadist besar"
                  defaultValue={dataCalonUser?.is_hb}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_hb: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Pekerjaan" name="work">
                <Input
                  placeholder="Ketik pekerjaan"
                  defaultValue={dataCalonUser?.work}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      work: e.target.value,
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
