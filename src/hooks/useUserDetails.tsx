import { useEffect, useState } from "react";

export function useUserDetails(userId: string): User {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (userId != null) {
      try {
        fetch(`http://localhost:3005/users/profile/${userId}`, {
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
