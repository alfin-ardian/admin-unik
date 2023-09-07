import { useEffect, useState } from "react";
import { type LoginData } from "types/login";

export const useCurrentUser = () => {
  const [user, setUser] = useState<LoginData | null>(null);

  useEffect(() => {
    const currentuser: string | null = localStorage.getItem("currentUser");
    if (currentuser != null) {
      setUser(JSON.parse(currentuser));
    }
  }, []);

  return { user };
};

export const getCurrentUser = (): LoginData => {
  let user;
  const currentuser: string | null = localStorage.getItem("currentUser");
  if (currentuser != null) {
    user = JSON.parse(currentuser);
  }

  return user;
};
