import {
  type DesaResponse,
  type DesaFetchState,
  type DesaFetchAction,
} from "types/index";
import { useFetch } from "..";
import { toast } from "react-hot-toast";
import { getCurrentUser } from "@hooks/api";
import { type LoginData } from "types/login";
import { useEffect, useReducer } from "react";
import { desaFetchReducer } from "@reducers/desa";

export const useGetDesa = (filter: any) => {
  const [state, dispatch] = useReducer<
    (state: DesaFetchState, action: DesaFetchAction) => DesaFetchState
  >(desaFetchReducer, {
    data: null,
    error: null,
    loading: true,
  });
  const getAllData = useFetch("/desa");
  let token: string;
  const user: LoginData = getCurrentUser();
  if (user != null) {
    token = user.access_token;
  }

  const fetchData = async () => {
    try {
      const response = await getAllData(token);
      const jsonData: DesaResponse = await response.json();
      if (jsonData.meta.status !== 200) {
        return await Promise.reject(jsonData);
      }
      return await Promise.resolve(jsonData);
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_DESA_LIST", data: null });
    toast
      .promise<DesaResponse>(
        fetchData(),
        {
          error: "Loading error...",
          success: "Data loaded",
          loading: "Loading...",
        },
        { className: "Inter text-xs" }
      )
      .then((data) => {
        dispatch({ type: "FETCH_DESA_LIST_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_DESA_LIST_ERROR", data: null });
        console.log(err);
      });
  }, [filter]);
  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
};
