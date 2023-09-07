import {
  type Meta,
  type ErrorMessage,
  type LoginData,
  type LoginState,
  type LoginResponse,
} from "types/index";
import { useFetch } from "..";

export const useLogin = async (val: LoginState) => {
  const doLogin = useFetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(val),
  });

  try {
    const response = await doLogin();
    console.log(response, "res");
    const jsonData: LoginResponse = await response.json();
    const meta: Meta | undefined = jsonData.meta;
    const error: ErrorMessage | undefined = jsonData.error;

    if (
      error !== undefined ||
      meta === undefined ||
      meta == null ||
      meta.status != 200
    ) {
      return await Promise.reject({
        success: false,
        message: meta?.message,
      });
    }
    const loginData: LoginData | string | undefined | null = jsonData.data;
    if (loginData != null || loginData != "" || loginData != undefined) {
      localStorage.setItem("currentUser", JSON.stringify(loginData));
      return await Promise.resolve(jsonData);
      // return jsonData;
    }

    return await Promise.reject({
      success: false,
      message: "something wrong",
    });
  } catch (err) {
    return await Promise.reject(err);
  }
};
