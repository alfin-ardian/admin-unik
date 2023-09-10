import { TimFetchState, TimFetchAction } from "types/tim";

export const timFetchReducer = (
  state: TimFetchState,
  action: TimFetchAction
): TimFetchState => {
  switch (action.type) {
    case "FETCH_TIM_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_TIM_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_TIM_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
