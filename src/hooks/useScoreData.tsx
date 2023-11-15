import { useState, useEffect } from "react";

export interface ScoreData {
  claimsCreated: Claim[];
  commentsCreated: Comment[];
  upvotesReceived: number;
  downvotesReceived: number;
}

export function useScoreData(userId: string) {
  const [scoreData, setScoreData] = useState<null | ScoreData>(null);

  useEffect(() => {
    if (userId != null) {
      try {
        fetch(`http://localhost:3005/users/scores/${userId}`, {
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
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  return scoreData;
}
