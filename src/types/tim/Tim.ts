import { type Meta, type Pagination } from "..";

export interface TimData {
  id: string;
  daerah: Object;
  desa: Object;
  kelompok: Object;
  name: string;
  title: string;
  whatsapp: string;
  email: string;
  password: string;
  description: string;
  attachment: string;
  is_approve: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TimFetchState {
  loading: boolean;
  data: TimResponse | null;
  error: string | null;
}

export interface TimFetchAction {
  type: string;
  data: TimResponse | null;
}

export interface TimResponse {
  meta: Meta;
  data: TimData;
  paginate: Pagination;
}
