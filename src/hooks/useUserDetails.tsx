import { useEffect, useState } from "react";
import { API } from "../assets/constants";

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
