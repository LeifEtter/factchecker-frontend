import { ScoreData } from "../hooks/useScoreData";

export const calculateLevelFromScoreData = (scoreData: ScoreData): number => {
  return (
    scoreData.claimsCreated.length * 5 +
    scoreData.commentsCreated.length * 8 +
    scoreData.upvotesReceived * 10 -
    scoreData.downvotesReceived * 10
  );
};

export const determineUserTitleFromLevel = (level: number): string => {
  if (level < 10) {
    return "Fact Seeker";
  } else if (level < 50) {
    return "Trusted Member";
  } else if (level < 100) {
    return "Verification Boss";
  } else {
    return "Beacon of Truth";
  }
};
