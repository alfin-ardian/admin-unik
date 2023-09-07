import { DaerahFetchState, DaerahFetchAction } from "types/daerah";

export const daerahFetchReducer = (
  state: DaerahFetchState,
  action: DaerahFetchAction
): DaerahFetchState => {
  switch (action.type) {
    case "FETCH_DAERAH_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DAERAH_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_DAERAH_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
