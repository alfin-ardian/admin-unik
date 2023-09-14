import { type Meta, type Pagination } from "..";

export interface DaerahData {
  id: string;
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

export interface DaerahState {
  id: string;
  name: string;
}

export interface ProvinceData {
  name: string;
  province_code: string;
}

export interface CityData {
  name: string;
  province_code: string;
  regency_code: string;
}

export interface DistrictData {
  name: string;
  province_code: string;
  regency_code: string;
  district_code: string;
}

export interface DaerahFetchState {
  loading: boolean;
  data: DaerahResponse | null;
  error: string | null;
}

export interface DaerahFetchAction {
  type: string;
  data: DaerahResponse | null;
}

export interface DaerahResponse {
  meta: Meta;
  data: DaerahData;
  paginate: Pagination;
}
