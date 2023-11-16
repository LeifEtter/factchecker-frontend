import { useEffect, useState } from "react";
import { API } from "../assets/constants";

export const useAuthentication = (): [boolean, boolean] => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [isLoading, isAuthenticated];
};
