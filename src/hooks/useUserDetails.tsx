import { useEffect, useState } from "react";
import { API } from "../assets/constants";

/**
 * @param userId - currently logged in users id
 *
 * @returns Hook used for getting currently logged in users user details
 */
export function useUserDetails(userId: string): [boolean, User] {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId != null) {
      try {
        setIsLoading(true);
        fetch(`${API}/users/profile/${userId}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((user) => {
            setUser(user);
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  return [isLoading, user];
}
