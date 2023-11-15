import { useEffect, useState } from "react";
import { ScoreData, useScoreData } from "../../hooks/useScoreData";
import { useRouter } from "next/router";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
} from "../../utils/scores";
import { useUserDetails } from "../../hooks/useUserDetails";
import Image from "next/image";

export default function Scores() {
  const router = useRouter();
  const { id } = router.query;
  const scoreData = useScoreData(id as string);
  const user = useUserDetails(id as string);
  const [userLevel, setUserLevel] = useState(null);
  const [userTitle, setUserTitle] = useState(null);

  useEffect(() => {
    if (scoreData != null) {
      const level = calculateLevelFromScoreData(scoreData);
      setUserLevel(level);
      const userTitle = determineUserTitleFromLevel(level);
      setUserTitle(userTitle);
    }
  }, [scoreData]);

  if (scoreData == null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1 data-testid="user-title">{userTitle}</h1>
      <h1 data-testid="user-name">{user.name}</h1>
      <div className="relative w-10 h-10">
        <Image
          src={user.avatar}
          alt="user-profile-image"
          data-testid="user-profile-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <p data-testid="user-biography">{user.biography}</p>
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
