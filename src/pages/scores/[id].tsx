import { useEffect, useState } from "react";
import { ScoreData, useScoreData } from "../../hooks/useScoreData";
import { useRouter } from "next/router";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);
  const [userLevel, setUserLevel] = useState(null);

  const calculateLevelFromScoreData = (scoreData: ScoreData): number => {
    return (
      scoreData.claimsCreated.length * 5 +
      scoreData.commentsCreated.length * 8 +
      scoreData.upvotesReceived * 10 -
      scoreData.downvotesReceived * 10
    );
  };

  useEffect(() => {
    if (scoreData != null) {
      setUserLevel(calculateLevelFromScoreData(scoreData));
    }
  }, [scoreData]);

  if (scoreData == null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Claims</h1>
      <p data-testid="user-level">User Level: {userLevel}</p>
      <div data-testid="claim-list">
        {scoreData.claimsCreated.map((claim) => (
          <div key={`claim-${claim.id}`}>
            <h2>{claim.statement}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
