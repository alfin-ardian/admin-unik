import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Button, Form, Input, Tooltip } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
import { API_GOOGLE_MAP } from "@utils/Config";
import { Link } from "react-router-dom";

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

export const DetailDaerah: React.FC = () => {
  const [center] = useState<any>({
    lat: -7.413882,
    lng: 111.11001,
  });
  return (
    <>
      <div className="bg-white p-4" style={{ borderRadius: "10px" }}>
        <div className="flex space-x-4 justify-end mb-2">
          <Link to={`/daerah`}>
            <Button>Kembali</Button>
          </Link>
          <Button htmlType="submit">Submit</Button>
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
                name="username"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Keimaman"
                name="username"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Wakil Keimaman" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Tim Pernikahan" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Wakil Tim Pernikahan" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Provinsi" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Kecamatan" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Latitude" name="username">
                <Input />
              </Form.Item>
            </div>
            <div className="w-1/2 pl-4">
              <Form.Item label="Keterangan" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Whatsapp KI" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Whatsapp Tim Pernikahan" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Whatsapp Wakil Tim" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Kab / Kota" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Alamat" name="password">
                <Input />
              </Form.Item>
              <Form.Item label="Logitude" name="password">
                <Input />
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
    </>
  );
};
