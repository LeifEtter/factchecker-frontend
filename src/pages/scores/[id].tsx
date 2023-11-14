import { useEffect, useState } from "react";
import { ScoreData, useScoreData } from "../../hooks/useScoreData";
import { useRouter } from "next/router";
import { calculateLevelFromScoreData } from "../../utils/scores";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);
  const [userLevel, setUserLevel] = useState(null);

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
