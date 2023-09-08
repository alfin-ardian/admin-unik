import React, { useState } from "react";
import type { SelectProps } from "antd";
import { usePostDaerah } from "@hooks/api";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";
import { API_GOOGLE_MAP } from "@utils/Config";
import toast, { Toaster } from "react-hot-toast";
import { EnvironmentFilled } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, Select } from "antd";
import { useGetProvinces, useGetRegencies } from "@hooks/api";

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

export const AddDaerah: React.FC = () => {
  const navigate = useNavigate();
  const [dataDaerah, setDataDaerah] = useState<any>({});
  const [center] = useState<any>({
    lat: -7.413882,
    lng: 111.11001,
  });

  const dataProvinces = useGetProvinces();
  const dataRegencies = useGetRegencies();
  const options: SelectProps["options"] = [];
  const optionsCity: SelectProps["options"] = [];
  const [regencies, setRegencies] = useState<any>({ province_code: "" });
  dataProvinces?.data?.map((item: any) => {
    options.push({ value: item.name, label: item.name, key: item.code });
  });

  dataRegencies?.data?.map((item: any) => {
    if (item.province_code == regencies.province_code) {
      optionsCity.push({ value: item.name, label: item.name, key: item.code });
    }
  });

  const handleChangeProvince = (value: string, e: any) => {
    setRegencies({ province_code: e.key });
    setDataDaerah({ ...dataDaerah, province: value, city: "" });
  };

  const handleChangeCity = (value: string) => {
    setDataDaerah({ ...dataDaerah, city: value });
  };

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
                label="Nama Daerah"
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
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Provinsi"
                  onChange={handleChangeProvince}
                  options={options}
                />
              </Form.Item>
              <Form.Item label="Kecamatan" name="district">
                <Input
                  defaultValue={dataDaerah?.district}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, district: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Latitude" name="latitude">
                <Input
                  defaultValue={dataDaerah?.latitude}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, latitude: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item label="Keterangan" name="description">
                <Input
                  defaultValue={dataDaerah?.description}
                  onChange={(e) =>
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
                  onChange={(e) =>
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
                  onChange={(e) =>
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
                  onChange={(e) =>
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
                  onChange={(e) =>
                    setDataDaerah({
                      ...dataDaerah,
                      whatsapp_vice_staff: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Kab / Kota" name="city">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Kota / Kabupaten"
                  value={dataDaerah?.city}
                  onChange={handleChangeCity}
                  options={optionsCity}
                />
              </Form.Item>
              <Form.Item label="Alamat" name="address">
                <Input
                  defaultValue={dataDaerah?.address}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, address: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Logitude" name="longitude">
                <Input
                  defaultValue={dataDaerah?.longitude}
                  onChange={(e) =>
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
