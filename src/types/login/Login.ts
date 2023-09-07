import { type Meta, type ErrorMessage } from "..";

export interface LoginData {
  id: string;
  name: string;
  username: string;
  whatsapp: string;
  email: string;
  access_token: string;
  refresh_token: string;
  expired_token: string;
  created_at: string;
  updated_at: string;
}
export interface LoginResponse {
  meta?: Meta;
  error?: ErrorMessage;
  data: LoginData;
}
export interface LoginState {
  username: string;
  password: string;
}
export interface LoginAction {
  type: string;
  payload: string;
}
export interface LoginValidationState {
  usernameError: boolean;
  passwordError: boolean;
}
export interface LoginvalidationAction {
  type: string;
  payload: LoginState;
}
export interface LoginFetchState {
  loading: boolean;
  data: LoginData | null;
  error: string | null;
}
export interface LoginFetchAction {
  type: string;
  data: LoginData | null;
}
