import { type Meta, type Pagination } from "..";

export interface UserData {
  id: string;
  name: string;
  gender: string;
  dob: string;
  description: string;
  whatsapp: string;
  email: string;
  password: string;
  daerah: Object;
  desa: Object;
  kelompok: Object;
  staff_name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  tb: number;
  bb: number;
  biography: string;
  hobbies: string;
  jumlah_saudara: number;
  anak_ke: number;
  last_education: string;
  instance_education: string;
  major: string;
  ponpes: string;
  is_mt: boolean;
  is_hb: boolean;
  is_sarjana: boolean;
  work: string;
  is_approved: boolean;
  verified: Object;
  badge: Object;
  last_login: Date;
  partner: string;
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
