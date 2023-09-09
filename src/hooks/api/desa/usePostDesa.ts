import { useFetch } from "..";
import { type LoginData } from "types/login";
import { getCurrentUser } from "@hooks/api";

export const usePostDesa = async (val: any) => {
  let token: string | undefined = "";
  let cookie: string | undefined = "";
  const user: LoginData = getCurrentUser();
  if (user != null) {
    token = user.access_token;
    cookie = "refresh_token=" + user.refresh_token;
  }

  const addData = useFetch(`/desa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(val),
  });

  try {
    const response = await addData(token);
    const jsonData = await response.json();
    if (jsonData.meta.status !== 200) {
      return await Promise.reject(jsonData);
    }
    return await Promise.resolve(jsonData);
  } catch (err) {
    return await Promise.reject(err);
  }
};
