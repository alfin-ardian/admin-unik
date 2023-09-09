import { DesaFetchState, DesaFetchAction } from "types/desa";

export const desaFetchReducer = (
  state: DesaFetchState,
  action: DesaFetchAction
): DesaFetchState => {
  switch (action.type) {
    case "FETCH_DESA_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DESA_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_DESA_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
