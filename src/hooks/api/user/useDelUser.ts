import { useFetch } from "..";
import { type LoginData } from "types/login";
import { getCurrentUser } from "@hooks/api";

export const useDelUser = async (id: string) => {
  let token: string | undefined = "";
  let cookie: string | undefined = "";
  const user: LoginData = getCurrentUser();
  if (user != null) {
    token = user.access_token;
    cookie = "refresh_token=" + user.refresh_token;
  }

  const updateData = useFetch(`/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
  });

  try {
    const response = await updateData(token);
    const jsonData = await response.json();
    if (jsonData.meta.status !== 200) {
      return await Promise.reject(jsonData);
    }
    return await Promise.resolve(jsonData);
  } catch (err) {
    return await Promise.reject(err);
  }
};
