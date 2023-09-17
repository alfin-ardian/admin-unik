import dayjs from "dayjs";
import "dayjs/locale/id";
import { usePutUser } from "@hooks/api";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import {
  SelectProvinces,
  SelectRegencies,
  SelectDistricts,
  SelectDaerah,
  SelectDesa,
  SelectKelompok,
} from "@components/common/atoms";

export const DetailCalonUser: React.FC = () => {
  const navigate = useNavigate();
  const dateFormat = "DD-MM-YYYY";
  const { state: calonUserDetail } = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any>({
    name: calonUserDetail?.province,
    province_code: "",
  });
  const [regencies, setRegencies] = useState<any>({
    name: calonUserDetail?.city,
    province_code: "",
  });
  const [districts, setDistricts] = useState<any>({
    name: calonUserDetail?.district,
    regency_code: "",
  });
  const [dataCalonUser, setDataCalonUser] = useState<any>(calonUserDetail);
  const [daerah, setDaerah] = useState<any>(calonUserDetail?.daerah);
  const [desa, setDesa] = useState<any>(calonUserDetail?.desa);
  const [kelompok, setKelompok] = useState<any>(calonUserDetail?.kelompok);

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
      ...dataCalonUser,
      daerah: daerah,
      desa: desa,
      kelompok: kelompok,
      province: provinces.name,
      city: regencies.name,
      district: districts.name,
    });
  }, [daerah, desa, kelompok, provinces, regencies, districts]);

  const onUpdate = () => {
    usePutUser(dataCalonUser)
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
              <Form.Item label="Nama" name="name" rules={[{ required: true }]}>
                <Input
                  placeholder="Nama Lengkap"
                  disabled={!isEdit}
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
                <DatePicker
                  placeholder="Pilih tanggal lahir"
                  disabled={!isEdit}
                  defaultValue={dayjs(
                    dayjs(dataCalonUser?.dob).format("DD-MM-YYYY"),
                    dateFormat
                  )}
                  format={dateFormat}
                  style={{ width: "100%" }}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      dob: e,
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                <SelectDaerah
                  setDaerah={setDaerah}
                  daerah={daerah}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item
                label="Pilih Kelompok"
                name="kelompok"
                rules={[{ required: true }]}
              >
                <SelectKelompok
                  disabled={!isEdit}
                  setKelompok={setKelompok}
                  kelompok={kelompok}
                  desa={desa}
                />
              </Form.Item>
              <Form.Item label="Provinsi" name="province">
                <SelectProvinces
                  setProvinces={setProvinces}
                  provinces={provinces}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item label="Kecamatan" name="district">
                <SelectDistricts
                  setDistricts={setDistricts}
                  districts={districts}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item label="Tinggi Badan" name="tb">
                <Input
                  placeholder="Ketik tinggi badan (cm)"
                  disabled={!isEdit}
                  type="number"
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  type="number"
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  defaultValue={dataCalonUser?.major}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      major: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Mubalight?" name="is_mt">
                <Select
                  placeholder="Apakah anda seorang mubalight / mubalighot"
                  disabled={!isEdit}
                  defaultValue={dataCalonUser?.is_mt ? "Iya" : "Tidak"}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_mt: e,
                    })
                  }
                  options={[
                    { value: "true", label: "Iya" },
                    { value: "false", label: "Tidak" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Sarjana?" name="is_sarjana">
                <Select
                  placeholder="Apakah anda seorang sarjana"
                  disabled={!isEdit}
                  defaultValue={dataCalonUser?.is_sarjana ? "Iya" : "Tidak"}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_sarjana: e,
                    })
                  }
                  options={[
                    { value: "true", label: "Iya" },
                    { value: "false", label: "Tidak" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true }]}
              >
                <Select
                  defaultValue="Pilih Jenis Kelamin"
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      gender: e,
                    })
                  }
                  options={[
                    { value: "L", label: "Laki - laki" },
                    { value: "P", label: "Perempuan" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Approve"
                name="is_approved"
                rules={[{ required: true }]}
              >
                <Select
                  defaultValue={dataCalonUser?.is_approved ? "Iya" : "Tidak"}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_approved: e,
                    })
                  }
                  options={[
                    { value: "true", label: "Iya" },
                    { value: "false", label: "Tidak" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ketik email"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                <SelectDesa
                  daerah={daerah}
                  setDesa={setDesa}
                  desa={desa}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item
                label="Tim Pernikahan Kelompok"
                name="staff_name"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Sebutkan nama tim pernikahan kelompok anda"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item label="Alamat" name="address">
                <Input
                  placeholder="Ketik alamat lengkap"
                  disabled={!isEdit}
                  defaultValue={dataCalonUser?.address}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Berat Badan" name="bb">
                <Input
                  placeholder="Ketik berat badan (kg)"
                  disabled={!isEdit}
                  type="number"
                  defaultValue={dataCalonUser?.bb}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      bb: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Hobbi" name="hobbies">
                <Input
                  placeholder="Ketik hobbi anda"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  type="number"
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                <Select
                  placeholder="Apakah anda khatam hadist besar"
                  disabled={!isEdit}
                  defaultValue={dataCalonUser?.is_hb ? "Iya" : "Tidak"}
                  onChange={(e: any) =>
                    setDataCalonUser({
                      ...dataCalonUser,
                      is_hb: e,
                    })
                  }
                  options={[
                    { value: "true", label: "Iya" },
                    { value: "false", label: "Tidak" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Pekerjaan" name="work">
                <Input
                  placeholder="Ketik pekerjaan"
                  disabled={!isEdit}
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
