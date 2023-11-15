import { useEffect, useState } from "react";
import { ScoreData, useScoreData } from "../../hooks/useScoreData";
import { useRouter } from "next/router";
import {
  calculateLevelFromScoreData,
  determineUserTitleFromLevel,
} from "../../utils/scores";
import { useUserDetails } from "../../hooks/useUserDetails";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faHandshake,
  faQuestion,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className="h-10 bg-white special-shadow rounded-4xl flex items-center p-5 gap-3 justify-center mt-12 font-semibold text-gray-800">
        <div className="flex gap-1 items-center">
          <h3 data-testid="indicator-claims-created">
            {scoreData.claimsCreated.length}
          </h3>
          <FontAwesomeIcon icon={faQuestion} className="text-blue-700" />
        </div>
        <div className="flex gap-1 items-center">
          <h3 data-testid="indicator-comments-created">
            {scoreData.commentsCreated.length}
          </h3>
          <FontAwesomeIcon icon={faGavel} className="text-red-700" />
        </div>
        <div className="flex gap-1 items-center">
          <h3 data-testid="indicator-upvotes-received">
            {scoreData.upvotesReceived}
          </h3>
          <FontAwesomeIcon icon={faHandshake} className="text-green-600" />
        </div>
        <div className="flex gap-1 items-center">
          <h3 data-testid="indicator-user-level">{userLevel}</h3>
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        </div>
      </div>
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
