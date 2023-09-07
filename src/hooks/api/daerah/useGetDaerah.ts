import {
  type DaerahResponse,
  type DaerahFetchState,
  type DaerahFetchAction,
} from "types/index";
import { useFetch } from "..";
import { toast } from "react-hot-toast";
import { getCurrentUser } from "@hooks/api";
import { type LoginData } from "types/login";
import { useEffect, useReducer } from "react";
import { daerahFetchReducer } from "@reducers/daerah/Daerah";

interface DaerahParams {
  filter: {
    page: number;
    orderBy: string;
  };
}

export const useGetDaerah = (filter: any) => {
  const [state, dispatch] = useReducer<
    (state: DaerahFetchState, action: DaerahFetchAction) => DaerahFetchState
  >(daerahFetchReducer, {
    data: null,
    error: null,
    loading: true,
  });
  const getAllDaerah = useFetch("/daerah");
  let token: string;
  const user: LoginData = getCurrentUser();
  if (user != null) {
    token = user.access_token;
  }

  const fetchData = async ({ filter }: DaerahParams) => {
    try {
      const response = await getAllDaerah(
        token,
        `?page=${filter.page}&orderBy=${filter.orderBy}`
      );
      const jsonData: DaerahResponse = await response.json();

      return await Promise.resolve(jsonData);
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_DAERAH_LIST", data: null });
    toast
      .promise<DaerahResponse>(
        fetchData({ filter }),
        {
          error: "Loading error...",
          success: "Data loaded",
          loading: "Loading...",
        },
        { className: "Inter text-xs" }
      )
      .then((data) => {
        dispatch({ type: "FETCH_DAERAH_LIST_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_DAERAH_LIST_ERROR", data: null });
        console.log(err);
      });
  }, [filter]);
  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
};
