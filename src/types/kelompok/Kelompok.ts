import { type Meta, type Pagination } from "..";
import {
  ProvinceData,
  CityData,
  DistrictData,
  DaerahState,
  DesaState,
} from "..";

export interface KelompokData {
  id: string;
  daerah: DaerahState;
  desa: DesaState;
  name: string;
  description: string;
  leader: string;
  whatsapp_leader: string;
  vice_leader: string;
  whatsapp_vice_leader: string;
  staff: string;
  whatsapp_staff: string;
  vice_staff: string;
  whatsapp_vice_staff: string;
  province: ProvinceData;
  city: CityData;
  district: DistrictData;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface KelompokState {
  id: string;
  name: string;
}

export interface KelompokFetchState {
  loading: boolean;
  data: KelompokResponse | null;
  error: string | null;
}

export interface KelompokFetchAction {
  type: string;
  data: KelompokResponse | null;
}

export interface KelompokResponse {
  meta: Meta;
  data: KelompokData;
  paginate: Pagination;
}
