import { useContext } from "react";
import { useScoreData } from "../../hooks/useScoreData";
import { UserContext } from "../../state/user";
import { useRouter } from "next/router";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);

  if (scoreData == null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Claims</h1>
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
