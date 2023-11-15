import { useEffect, useState } from "react";
import { API } from "../assets/constants";

export const useAuthentication = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch(`${API}/users/authenticate`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then((res) => {
      if (res.status == 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return isAuthenticated;
};
