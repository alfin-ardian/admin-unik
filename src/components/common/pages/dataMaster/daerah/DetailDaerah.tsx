import React, { useState, useEffect } from "react";
import { usePutDaerah } from "@hooks/api";
import GoogleMapReact from "google-map-react";
import { API_GOOGLE_MAP } from "@utils/Config";
import { Button, Form, Input, Tooltip } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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

export const DetailDaerah: React.FC = () => {
  const { state: daerahDetail } = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataDaerah, setDataDaerah] = useState<any>(daerahDetail);
  const [center, setCenter] = useState<any>({
    lat: dataDaerah?.latitude,
    lng: dataDaerah?.longitude,
  });

  const [provinces, setProvinces] = useState<any>({
    name: dataDaerah?.province,
    province_code: "",
  });
  const [regencies, setRegencies] = useState<any>({
    name: dataDaerah?.city,
    province_code: "",
  });
  const [districts, setDistricts] = useState<any>({
    name: dataDaerah?.district,
    regency_code: "",
  });

  useEffect(() => {
    setDataDaerah({
      ...dataDaerah,
      province: provinces?.name,
    });
    setRegencies({ ...regencies, province_code: provinces.province_code });
  }, [provinces]);

  useEffect(() => {
    setDataDaerah({
      ...dataDaerah,
      city: regencies.name,
    });
    setDistricts({ ...districts, regency_code: regencies.regency_code });
  }, [regencies]);

  useEffect(() => {
    setDataDaerah({
      ...dataDaerah,
      district: districts.name,
    });
  }, [districts]);

  useEffect(() => {
    setCenter({
      lat: dataDaerah?.latitude,
      lng: dataDaerah?.longitude,
    });
  }, [dataDaerah]);

  const onUpdate = () => {
    usePutDaerah(dataDaerah)
      .then(() => {
        toast.success("Data berhasil diupdate");
        setIsEdit(!isEdit);
      })
      .catch((err) => {
        toast.error(err.message);
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
              <Link to={`/daerah`}>
                <Button>Kembali</Button>
              </Link>

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
                label="Nama Daerah"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  defaultValue={dataDaerah?.name}
                  disabled={!isEdit}
                  onChange={(e) =>
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
                  disabled={!isEdit}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, leader: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Keimaman" name="vice_leader">
                <Input
                  defaultValue={dataDaerah?.vice_leader}
                  disabled={!isEdit}
                  onChange={(e) =>
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
                  disabled={!isEdit}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, staff: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Wakil Tim Pernikahan" name="vice_staff">
                <Input
                  defaultValue={dataDaerah?.vice_staff}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, vice_staff: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Provinsi" name="province">
                <SelectProvinces
                  setProvinces={setProvinces}
                  disabled={!isEdit}
                  provinces={provinces}
                />
              </Form.Item>
              <Form.Item label="Kecamatan" name="district">
                <SelectDistricts
                  setDistricts={setDistricts}
                  disabled={!isEdit}
                  districts={districts}
                />
              </Form.Item>
              <Form.Item label="Latitude" name="latitude">
                <Input
                  defaultValue={dataDaerah?.latitude}
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  onChange={(e) =>
                    setDataDaerah({
                      ...dataDaerah,
                      whatsapp_vice_staff: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Kota / Kabupaten" name="city">
                <SelectRegencies
                  setRegencies={setRegencies}
                  disabled={!isEdit}
                  regencies={regencies}
                />
              </Form.Item>
              <Form.Item label="Alamat" name="address">
                <Input
                  defaultValue={dataDaerah?.address}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setDataDaerah({ ...dataDaerah, address: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Logitude" name="longitude">
                <Input
                  defaultValue={dataDaerah?.longitude}
                  disabled={!isEdit}
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
