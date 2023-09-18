import { type Meta, type Pagination } from "../..";

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface BadgeState {
  id: string;
  name: string;
}

export interface BadgeFetchState {
  loading: boolean;
  data: BadgeResponse | null;
  error: string | null;
}

export interface BadgeFetchAction {
  type: string;
  data: BadgeResponse | null;
}

export interface BadgeResponse {
  meta: Meta;
  data: BadgeData;
  paginate: Pagination;
}
