import { type Meta, type Pagination } from "..";

export interface UserData {
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
  attachments: string;
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserFetchState {
  loading: boolean;
  data: UserResponse | null;
  error: string | null;
}

export interface UserFetchAction {
  type: string;
  data: UserResponse | null;
}

export interface UserResponse {
  meta: Meta;
  data: UserData;
  paginate: Pagination;
}
