import { type Meta, type Pagination } from "..";
import { ProvinceData, CityData, DistrictData, DaerahState } from "..";

export interface DesaData {
  id: string;
  daerah: DaerahState;
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

export interface DesaState {
  id: string;
  name: string;
}

export interface DesaFetchState {
  loading: boolean;
  data: DesaResponse | null;
  error: string | null;
}

export interface DesaFetchAction {
  type: string;
  data: DesaResponse | null;
}

export interface DesaResponse {
  meta: Meta;
  data: DesaData;
  paginate: Pagination;
}
