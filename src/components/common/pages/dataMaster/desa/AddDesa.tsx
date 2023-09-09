import { usePostDaerah } from "@hooks/api";
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
  const [dataDaerah, setDataDaerah] = useState<any>({});
  const [center] = useState<any>({
    lat: -7.413882,
    lng: 111.11001,
  });

  const [provinces, setProvinces] = useState<any>({});
  const [regencies, setRegencies] = useState<any>({ province_code: "" });
  const [districts, setDistricts] = useState<any>({ regency_code: "" });

  useEffect(() => {
    setDataDaerah({
      ...dataDaerah,
      provinces: provinces.name,
    });
    setRegencies({ ...regencies, province_code: provinces.province_code });
  }, [provinces]);

  useEffect(() => {
    setDataDaerah({
      ...dataDaerah,
      regencies: regencies.name,
    });
    setDistricts({ ...districts, regency_code: regencies.regency_code });
  }, [regencies]);

  useEffect(() => {
    setDataDaerah({
      ...dataDaerah,
      districts: districts.name,
    });
  }, [districts]);

  const onUpdate = () => {
    usePostDaerah(dataDaerah)
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
                label="Nama Desa"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataDaerah?.name}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Keimaman"
                name="leader"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataDaerah?.leader}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, leader: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Keimaman" name="vice_leader">
                <Input
                  defaultValue={dataDaerah?.vice_leader}
                  onChange={(e: any) =>
                    setDataDaerah({
                      ...dataDaerah,
                      vice_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Tim Pernikahan" name="staff">
                <Input
                  defaultValue={dataDaerah?.staff}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, staff: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Tim Pernikahan" name="vice_staff">
                <Input
                  defaultValue={dataDaerah?.vice_staff}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, vice_staff: e.target.value })
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
                  defaultValue={dataDaerah?.latitude}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, latitude: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item label="Keterangan" name="description">
                <Input
                  defaultValue={dataDaerah?.description}
                  onChange={(e: any) =>
                    setDataDaerah({
                      ...dataDaerah,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp KI" name="whatsapp_leader">
                <Input
                  defaultValue={dataDaerah?.whatsapp_leader}
                  onChange={(e: any) =>
                    setDataDaerah({
                      ...dataDaerah,
                      whatsapp_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil" name="whatsapp_vice_leader">
                <Input
                  defaultValue={dataDaerah?.whatsapp_vice_leader}
                  onChange={(e: any) =>
                    setDataDaerah({
                      ...dataDaerah,
                      whatsapp_vice_leader: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Tim Pernikahan" name="whatsapp_staff">
                <Input
                  defaultValue={dataDaerah?.whatsapp_staff}
                  onChange={(e: any) =>
                    setDataDaerah({
                      ...dataDaerah,
                      whatsapp_staff: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil Tim" name="whatsapp_vice_staff">
                <Input
                  defaultValue={dataDaerah?.whatsapp_vice_staff}
                  onChange={(e: any) =>
                    setDataDaerah({
                      ...dataDaerah,
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
                  defaultValue={dataDaerah?.address}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, address: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Logitude" name="longitude">
                <Input
                  defaultValue={dataDaerah?.longitude}
                  onChange={(e: any) =>
                    setDataDaerah({ ...dataDaerah, longitude: e.target.value })
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
