import { useState, useEffect } from "react";
import { API } from "../assets/constants";

export interface ScoreData {
  claimsCreated: Claim[];
  commentsCreated: Comment[];
  upvotesReceived: number;
  downvotesReceived: number;
}

export function useScoreData(userId: string): [boolean, ScoreData] {
  const [scoreData, setScoreData] = useState<null | ScoreData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId != null) {
      setIsLoading(true);
      try {
        fetch(`${API}/users/scores/${userId}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((scores) => {
            setScoreData({
              claimsCreated: scores.claimsCreated,
              commentsCreated: scores.commentsCreated ?? [],
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
