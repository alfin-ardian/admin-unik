import { UserFetchState, UserFetchAction } from "types/user";

export const userFetchReducer = (
  state: UserFetchState,
  action: UserFetchAction
): UserFetchState => {
  switch (action.type) {
    case "FETCH_USER_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USER_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_USER_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
