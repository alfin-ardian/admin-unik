import { BadgeFetchState, BadgeFetchAction } from "types/dataMarketing";

export const badgeFetchReducer = (
  state: BadgeFetchState,
  action: BadgeFetchAction
): BadgeFetchState => {
  switch (action.type) {
    case "FETCH_BADGE_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BADGE_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_BADGE_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
