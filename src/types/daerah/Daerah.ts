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
  province: string;
  city: string;
  district: string;
  address: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
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
