import Image from "next/image";
import { ScoreBar } from "../ScoreBar";
import { calculateLevelFromScoreData } from "../../utils/scores";
import { ScoreData } from "../../hooks/useScoreData";

interface RankCardProps {
  rank: number;
  name: string;
  userId: number;
  scores: Object;
  profileImage: string;
  backgroundColor: string;
  onClick: Function;
}

export const RankCard = ({
  rank,
  name,
  userId,
  scores,
  profileImage,
  backgroundColor,
  onClick,
}: RankCardProps) => {
  const scoreData: ScoreData = {
    claimsCreated: scores["claims_created"],
    commentsCreated: scores["comments_created"],
    upvotesReceived: scores["upvotesReceived"],
    downvotesReceived: scores["downvotesReceived"],
  };
  const userLevel = calculateLevelFromScoreData(scoreData);
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
                src="https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
        <ScoreBar userLevel={userLevel} scoreData={scoreData} />
      </div>
    </div>
  );
};
