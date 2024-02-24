import { usePutKelompok } from "@hooks/api";
import GoogleMapReact from "google-map-react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_GOOGLE_MAP } from "@utils/Config";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
import {
  SelectProvinces,
  SelectRegencies,
  SelectDistricts,
  SelectDaerah,
  SelectDesa,
} from "@components/common/atoms";

interface Props {
  text: string;
  onClick?: () => void;
  style?: any;
  lat: number;
  lng: number;
}

const AnyReactComponent: React.FC<Props> = ({ text, onClick, style }) => (
  <div onClick={onClick}>
    <Tooltip title={text}>
      <EnvironmentFilled style={style} />
    </Tooltip>
  </div>
);

export const DetailKelompok: React.FC = () => {
  const navigate = useNavigate();
  const { state: detailKelompok } = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [center] = useState<any>({
    lat: -7.413882,
    lng: 111.11001,
  });

  const [provinces, setProvinces] = useState<any>(detailKelompok?.province);
  const [regencies, setRegencies] = useState<any>(detailKelompok?.city);
  const [districts, setDistricts] = useState<any>(detailKelompok?.district);
  const [dataKelompok, setDataKelompok] = useState<any>(detailKelompok);
  const [daerah, setDaerah] = useState<any>(detailKelompok?.daerah);
  const [desa, setDesa] = useState<any>(detailKelompok?.desa);

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
    setDataKelompok({
      ...dataKelompok,
      daerah: daerah,
      desa: desa,
      province: provinces,
      city: regencies,
      district: districts,
    });
  }, [daerah, desa, provinces, regencies, districts]);

  const onUpdate = () => {
    usePutKelompok(dataKelompok)
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

  const handleAddTimPernikahan = () => {
    setDataKelompok({
      ...dataKelompok,
      tim_pernikahan: [
        ...dataKelompok.tim_pernikahan,
        { name: "", whatsapp: "" },
      ],
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
              <Button onClick={handleAddTimPernikahan}>
                Tambah Tim Pernikahan
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
                name="name"
                rules={[{ required: true }]}
              >
                <SelectDaerah
                  setDaerah={setDaerah}
                  daerah={daerah}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item
                label="Nama Kelompok"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataKelompok?.name}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Keimaman"
                name="leader"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataKelompok?.leader}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({ ...dataKelompok, leader: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Keimaman" name="vice_leader">
                <Input
                  defaultValue={dataKelompok?.vice_leader}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      vice_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              {/* <Form.Item label="Tim Pernikahan" name="staff">
                <Input
                  defaultValue={dataKelompok?.staff}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({ ...dataKelompok, staff: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Tim Pernikahan" name="vice_staff">
                <Input
                  defaultValue={dataKelompok?.vice_staff}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      vice_staff: e.target.value,
                    })
                  }
                />
              </Form.Item> */}
              {dataKelompok?.tim_pernikahan?.map((item: any, index: number) => (
                <Form.Item
                  label={`Tim Pernikahan ${index + 1}`}
                  name={`tim_pernikahan[${index}].name`}
                >
                  <Input
                    defaultValue={item?.name}
                    disabled={!isEdit}
                    onChange={(e: any) => {
                      const updatedData = [...dataKelompok.tim_pernikahan];
                      updatedData[index] = {
                        ...updatedData[index],
                        name: e.target.value,
                      };

                      setDataKelompok({
                        ...dataKelompok,
                        tim_pernikahan: updatedData,
                      });
                    }}
                  />
                </Form.Item>
              ))}
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
              <Form.Item label="Latitude" name="latitude">
                <Input
                  defaultValue={dataKelompok?.latitude}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      latitude: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item
                label="Pilih Desa"
                name="name"
                rules={[{ required: true }]}
              >
                <SelectDesa
                  daerah={daerah}
                  setDesa={setDesa}
                  desa={desa}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item label="Keterangan" name="description">
                <Input
                  defaultValue={dataKelompok?.description}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp KI" name="whatsapp_leader">
                <Input
                  defaultValue={dataKelompok?.whatsapp_leader}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      whatsapp_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil" name="whatsapp_vice_leader">
                <Input
                  defaultValue={dataKelompok?.whatsapp_vice_leader}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      whatsapp_vice_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              {/* <Form.Item label="Whatsapp Tim Pernikahan" name="whatsapp_staff">
                <Input
                  defaultValue={dataKelompok?.whatsapp_staff}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      whatsapp_staff: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil Tim" name="whatsapp_vice_staff">
                <Input
                  defaultValue={dataKelompok?.whatsapp_vice_staff}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      whatsapp_vice_staff: e.target.value,
                    })
                  }
                />
              </Form.Item> */}
              {dataKelompok?.tim_pernikahan?.map((item: any, index: number) => (
                <Form.Item
                  label={`Whatsapp Tim Pernikahan ${index + 1}`}
                  // name="tim_pernikahan"
                  name={`tim_pernikahan[${index}].whatsapp`}
                >
                  <Input
                    defaultValue={item?.whatsapp}
                    disabled={!isEdit}
                    onChange={(e: any) => {
                      const updatedData = [...dataKelompok.tim_pernikahan];
                      updatedData[index] = {
                        ...updatedData[index],
                        whatsapp: e.target.value,
                      };

                      setDataKelompok({
                        ...dataKelompok,
                        tim_pernikahan: updatedData,
                      });
                    }}
                  />
                </Form.Item>
              ))}
              <Form.Item label="Kab / Kota" name="city">
                <SelectRegencies
                  setRegencies={setRegencies}
                  regencies={regencies}
                  disabled={!isEdit}
                />
              </Form.Item>
              <Form.Item label="Alamat" name="address">
                <Input
                  defaultValue={dataKelompok?.address}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Logitude" name="longitude">
                <Input
                  defaultValue={dataKelompok?.longitude}
                  disabled={!isEdit}
                  onChange={(e: any) =>
                    setDataKelompok({
                      ...dataKelompok,
                      longitude: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className="bg-white mt-2 p-3" style={{ borderRadius: "10px" }}>
        <div
          className="bg-white mt-2"
          style={{ borderRadius: "10px", height: "60vh", width: "100%" }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCLzjv60dsQJnTgVG3OQO3tESWVTyQuXo8",
              libraries: ["places", "geometry", "drawing", "visualization"],
            }}
            center={center}
            defaultZoom={12}
            layerTypes={["TrafficLayer", "TransitLayer"]}
          >
            <AnyReactComponent
              lat={center.lat}
              lng={center.lng}
              text={"Lokasi kamu saat ini"}
            />
          </GoogleMapReact>
        </div>
      </div>
      {/* <Toaster /> */}
    </>
  );
};
