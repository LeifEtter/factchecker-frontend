import { useContext, useEffect, useState } from "react";
import { API } from "../assets/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { RankCard } from "../components/cards/RankCard";
import { UserContext } from "../state/user";
import { useRouter } from "next/router";
import DefaultAvatar from "../../assets/default_avatar.jpg";
import { calculateLevelFromScoreData } from "../utils/scores";

/**
 * @returns Page containing scores of the best 50 reviewers
 */
export default function Scoreboard() {
  const [userScores, setUserScores] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [currentUsersScores, setCurrentUsersScores] = useState([]);
  const [showingAll, setShowingAll] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getAllUserScores();
    if (user) {
      getRequestingUsersScores();
    }
  }, [user]);

  const getAllUserScores = async () => {
    const result = await fetch(
      `${API}/users/scores?orderBy=comments_created&limit=50&skip=0`,
      {
        method: "GET",
      }
    );
    if (result.status == 200) {
      const userScores: Array<any> = await result.json();
      for (let user of userScores) {
        user.level = calculateLevelFromScoreData({
          claimsCreated: user["claims_created"],
          commentsCreated: user["comments_created"],
          upvotesReceived: user["upvotesReceived"],
          downvotesReceived: user["downvotesReceived"],
        });
      }
      userScores.sort((a, b) => b.level - a.level);
      setUserScores(userScores);
    }
  };

  const getRequestingUsersScores = async () => {
    if (user) {
      const result = fetch(`${API}/users/profile/${user.id}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => setCurrentUsersScores(result));
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium mt-16 mb-10">Top Reviewers</h1>
      <div className="flex flex-col gap-6 max-w-md w-9/12">
        {userScores.map((userScore, index) => {
          if (!showingAll && index > 2) {
            return;
          }
          let color: string;
          if (index == 0) {
            color = "251, 227, 129, 0.67";
          } else if (index == 1) {
            color = "192, 192, 192, 0.54";
          } else if (index == 2) {
            color = "205, 127, 50, 0.5";
          } else {
            color = "255, 255, 255, 1.0";
          }
          return (
            <RankCard
              key={`rank-${index}`}
              userId={userScore["user_id"]}
              rank={index}
              name={userScore["user_name"]}
              scores={userScore}
              profileImage={userScore.avatar ?? DefaultAvatar}
              backgroundColor={color}
              onClick={() => router.push(`/scores/${userScore["user_id"]}`)}
              level={userScore.level}
            />
          );
        })}
        {showingAll ? (
          <div
            onClick={() => setShowingAll(false)}
            className="flex justify-center items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronDown} /> Show Less
          </div>
        ) : (
          <div
            onClick={() => setShowingAll(true)}
            className="flex justify-center items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} /> Show More
          </div>
        )}

        {/* <div className="w-full border"></div>{}
        { user ? <div>
          <h1 className="text-2xl font-medium text-center">Your Rank</h1>
          <RankCard rank=
        </div> : <></> } */}
      </div>
    </main>
  );
}
