import { useState, useEffect } from "react";
import { API } from "../assets/constants";
import { calculateLevelFromScoreData } from "../utils/scores";
import { constructQueryUrl } from "../helpers/conversionHelpers";

/**
 * Hook for fetching Users given a User Query
 *
 * @param initialQuery - Initial Query used for fetching users
 *
 * @returns User Query with data for fetching users, Function for setting user query, fetched users and loading state
 */
export function useFetchUsers(
  initialQuery: UserQuery
): [UserQuery, Function, any[], boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userQuery, setUserQuery] = useState<UserQuery>(initialQuery);
  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    setIsLoading(true);
    const queryString = constructQueryUrl(userQuery);
    try {
      fetch(`${API}/${queryString}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((newUsers: any[]) => {
          for (let user of newUsers) {
            user.level = calculateLevelFromScoreData({
              claimsCreated: user["claims_created"],
              commentsCreated: user["comments_created"],
              upvotesReceived: user["upvotesReceived"],
              downvotesReceived: user["downvotesReceived"],
            });
          }
          newUsers.sort((a, b) => b.level - a.level);
          if (users && users.length != 0 && userQuery.skip != 0) {
            setUsers([...users, ...newUsers]);
          } else {
            setUsers(newUsers);
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [userQuery]);
  return [userQuery, setUserQuery, users, isLoading];
}
