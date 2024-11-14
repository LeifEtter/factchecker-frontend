import { useContext, useEffect } from "react";
import { RankCard } from "../components/cards/RankCard";
import { useRouter } from "next/router";
import DefaultAvatar from "../../assets/default_avatar.jpg";
import { UserSettingsContext } from "../state/settings";
import { useScrollTracker } from "../hooks/useScrollTracker";
import { LoadingDots } from "../components/LoadingDots";
import { useFetchUsers } from "../hooks/useFetchUsers";

const USERS_PER_FETCH: number = 5;

/**
 * @returns Page containing scores of the best 50 reviewers
 */
export default function Scoreboard() {
  const { darkModeActive } = useContext(UserSettingsContext);
  const router = useRouter();

  const [userQuery, setUserQuery, users, isLoadingUsers] = useFetchUsers({
    endpoint: "users/scores",
    limit: USERS_PER_FETCH,
    skip: 0,
    orderBy: "comments_created",
    orderByDirection: "DESC",
  });

  const onBottomReach = async () => {
    if (users.length < userQuery.skip + USERS_PER_FETCH) return;
    setUserQuery({
      ...userQuery,
      skip: (userQuery.skip += USERS_PER_FETCH),
    });
  };
  const [setTrackedElem] = useScrollTracker(users, onBottomReach);
  useEffect(() => setTrackedElem(document.querySelector("#loading-dots")), []);

  return (
    <main
      className={`${
        darkModeActive ? "text-gray-200" : "text-black"
      } flex flex-col justify-center items-center`}
    >
      <h1 className="text-2xl font-medium mt-16 mb-10">Top Reviewers</h1>
      <div className="flex flex-col gap-6 max-w-md w-9/12">
        {users &&
          users.map((user, index) => {
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
                userId={user["user_id"]}
                rank={index}
                name={user["user_name"]}
                scores={user}
                profileImage={user.avatar ?? DefaultAvatar}
                backgroundColor={color}
                onClick={() => router.push(`/scores/${user["user_id"]}`)}
                level={user.level}
              />
            );
          })}
        <div className="flex justify-center pb-5">
          <LoadingDots />
        </div>
      </div>
    </main>
  );
}
