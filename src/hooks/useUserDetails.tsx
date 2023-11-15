import { useEffect, useState } from "react";
import { API } from "../assets/constants";

export function useUserDetails(userId: string): User {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (userId != null) {
      try {
        fetch(`${API}/users/profile/${userId}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((user) => setUser(user));
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  return user;
}
