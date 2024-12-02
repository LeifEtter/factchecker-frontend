import { useEffect, useState } from "react";
import { API } from "../assets/constants";

/**
 * Hook for checking wether a user is authenticated
 *
 * @returns Loading State, Authentication state
 */
export const useAuthentication = (): [boolean, boolean, object] => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<object>(null);

  const authenticate = async () => {
    try {
      const res = await fetch(`${API}/users/authenticate`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      if (res.status != 200) {
        setIsAuthenticated(false);
        setIsLoading(false);
      } else {
        const body = await res.json();
        setUserData(body);
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return [isLoading, isAuthenticated, userData];
};
