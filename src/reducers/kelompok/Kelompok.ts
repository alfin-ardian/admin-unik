import { KelompokFetchState, KelompokFetchAction } from "types/kelompok";

export const kelompokFetchReducer = (
  state: KelompokFetchState,
  action: KelompokFetchAction
): KelompokFetchState => {
  switch (action.type) {
    case "FETCH_KELOMPOK_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_KELOMPOK_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_KELOMPOK_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
