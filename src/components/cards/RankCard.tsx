import Image, { StaticImageData } from "next/image";
import { ScoreBar } from "../ScoreBar";
import { calculateLevelFromScoreData } from "../../utils/scores";
import { ScoreData } from "../../hooks/useScoreData";

interface RankCardProps {
  rank: number;
  name: string;
  userId: number;
  scores: Object;
  profileImage: string | StaticImageData;
  backgroundColor: string;
  onClick: Function;
  level: number;
}

/**
 * @param rank - Users rank determined by scores
 * @param name - Users name
 * @param userId - Users id
 * @param scores - Object containing the users contributions, up- and donwvotes
 * @param profileImage - Users profile image
 * @param backgroundColor - Cards background color; different colors for ranks 1-3, and 4+
 * @param onClick - Callback to handle when card is clicked
 *
 * @returns Card containing a specific users rank, stats profile image and Name
 * Used in Scoreboard page
 */
export const RankCard = ({
  rank,
  name,
  userId,
  scores,
  profileImage,
  backgroundColor,
  onClick,
  level,
}: RankCardProps) => {
  const scoreData: ScoreData = {
    claimsCreated: scores["claims_created"],
    commentsCreated: scores["comments_created"],
    upvotesReceived: scores["upvotesReceived"],
    downvotesReceived: scores["downvotesReceived"],
  };

  return (
    <div
      className="w-full h-48 rounded-4xl flex flex-row cursor-pointer shadow-lg p-4"
      style={{ backgroundColor: `rgba(${backgroundColor})` }}
      onClick={() => onClick()}
    >
      <div className="basis-6/12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold ml-8 md:ml-10">
          Rank {rank + 1}
        </h2>
      </div>
      <div className="basis-6/12">
        <div className="flex flex-row gap-2">
          <div className="basis-6/12 flex flex-col justify-center">
            <h3 className="text-lg font-medium">{name}</h3>
          </div>
          <div className="basis-6/12 mb-2">
            <div className="relative rounded-3xl w-28 h-28 shadow-md">
              <Image
                alt={`profile-user-${userId}`}
                className="object-cover rounded-3xl"
                src={profileImage}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
        <ScoreBar userLevel={level} scoreData={scoreData} />
      </div>
    </div>
  );
};
