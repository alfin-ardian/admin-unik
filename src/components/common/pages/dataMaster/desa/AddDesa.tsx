import { usePostDesa } from "@hooks/api";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";
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

export const AddDesa: React.FC = () => {
  const navigate = useNavigate();
  const [center] = useState<any>({
    lat: -7.413882,
    lng: 111.11001,
  });

  const [provinces, setProvinces] = useState<any>({});
  const [regencies, setRegencies] = useState<any>({ province_code: "" });
  const [districts, setDistricts] = useState<any>({ regency_code: "" });
  const [dataDesa, setDataDesa] = useState<any>({});
  const [daerah, setDaerah] = useState<any>({});

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
    setDataDesa({
      ...dataDesa,
      daerah: daerah,
      provinces: provinces,
      city: regencies,
      districts: districts,
    });
  }, [daerah, provinces, regencies, districts]);

  const onUpdate = () => {
    usePostDesa(dataDesa)
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
              <Form.Item
                label="Pilih Daerah"
                name="name"
                rules={[{ required: true }]}
              >
                <SelectDaerah setDaerah={setDaerah} daerah={daerah} />
              </Form.Item>
              <Form.Item
                label="Keimaman"
                name="leader"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataDesa?.leader}
                  onChange={(e: any) =>
                    setDataDesa({ ...dataDesa, leader: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Keimaman" name="vice_leader">
                <Input
                  defaultValue={dataDesa?.vice_leader}
                  onChange={(e: any) =>
                    setDataDesa({
                      ...dataDesa,
                      vice_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Tim Pernikahan" name="staff">
                <Input
                  defaultValue={dataDesa?.staff}
                  onChange={(e: any) =>
                    setDataDesa({ ...dataDesa, staff: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Tim Pernikahan" name="vice_staff">
                <Input
                  defaultValue={dataDesa?.vice_staff}
                  onChange={(e: any) =>
                    setDataDesa({ ...dataDesa, vice_staff: e.target.value })
                  }
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
              <Form.Item label="Latitude" name="latitude">
                <Input
                  defaultValue={dataDesa?.latitude}
                  onChange={(e: any) =>
                    setDataDesa({ ...dataDesa, latitude: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item
                label="Nama Desa"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataDesa?.name}
                  onChange={(e: any) =>
                    setDataDesa({
                      ...dataDesa,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp KI" name="whatsapp_leader">
                <Input
                  defaultValue={dataDesa?.whatsapp_leader}
                  onChange={(e: any) =>
                    setDataDesa({
                      ...dataDesa,
                      whatsapp_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil" name="whatsapp_vice_leader">
                <Input
                  defaultValue={dataDesa?.whatsapp_vice_leader}
                  onChange={(e: any) =>
                    setDataDesa({
                      ...dataDesa,
                      whatsapp_vice_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Tim Pernikahan" name="whatsapp_staff">
                <Input
                  defaultValue={dataDesa?.whatsapp_staff}
                  onChange={(e: any) =>
                    setDataDesa({
                      ...dataDesa,
                      whatsapp_staff: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil Tim" name="whatsapp_vice_staff">
                <Input
                  defaultValue={dataDesa?.whatsapp_vice_staff}
                  onChange={(e: any) =>
                    setDataDesa({
                      ...dataDesa,
                      whatsapp_vice_staff: e.target.value,
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
                  defaultValue={dataDesa?.address}
                  onChange={(e: any) =>
                    setDataDesa({ ...dataDesa, address: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Logitude" name="longitude">
                <Input
                  defaultValue={dataDesa?.longitude}
                  onChange={(e: any) =>
                    setDataDesa({ ...dataDesa, longitude: e.target.value })
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
              key: API_GOOGLE_MAP,
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
      <Toaster />
    </>
  );
};
