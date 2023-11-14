import { ScoreData } from "../hooks/useScoreData";

export const calculateLevelFromScoreData = (scoreData: ScoreData): number => {
  return (
    scoreData.claimsCreated.length * 5 +
    scoreData.commentsCreated.length * 8 +
    scoreData.upvotesReceived * 10 -
    scoreData.downvotesReceived * 10
  );
};
