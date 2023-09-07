// import { type RoleEditState } from "types/account";
import { useFetch } from "..";
import { type LoginData } from "types/login";
import { getCurrentUser } from "@hooks/api";

export const usePutDaerah = async (val: any) => {
  let token: string | undefined = "";
  let cookie: string | undefined = "";
  const user: LoginData = getCurrentUser();
  if (user != null) {
    token = user.access_token;
    cookie = "refresh_token=" + user.refresh_token;
  }

  const updateData = useFetch(`/daerah/${val.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(val),
  });

  try {
    const response = await updateData(token);
    const jsonData = await response.json();
    const data = jsonData.data;
    return await Promise.resolve(data);
  } catch (err) {
    return await Promise.reject(err);
  }
};
