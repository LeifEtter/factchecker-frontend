import { useState, useEffect } from "react";
import { API } from "../assets/constants";

export interface ScoreData {
  claimsCreated: Claim[];
  commentsCreated: ClaimComment[];
  upvotesReceived: number;
  downvotesReceived: number;
}

/**
 * @param userId current users id
 * @returns Hook used for getting the currently logged in users scores
 */
export function useScoreData(userId: string): [boolean, ScoreData] {
  const [scoreData, setScoreData] = useState<null | ScoreData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId != null) {
      setIsLoading(true);
      try {
        fetch(`${API}/users/profile/${userId}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((scores) => {
            setScoreData({
              claimsCreated: scores.claimsCreated,
              commentsCreated: scores.commentsCreated,
              upvotesReceived: scores.upvotesReceived,
              downvotesReceived: scores.downvotesReceived,
            });
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  return [isLoading, scoreData];
}
