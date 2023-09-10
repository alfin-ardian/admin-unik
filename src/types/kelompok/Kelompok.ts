import { type Meta, type Pagination } from "..";

export interface KelompokData {
  id: string;
  daerah: Object;
  desa: Object;
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
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
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
