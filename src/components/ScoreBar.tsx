import {
  faGavel,
  faHandshake,
  faQuestion,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ScoreData } from "../hooks/useScoreData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserSettingsContext } from "../state/settings";

interface ScoreBarProps {
  scoreData: ScoreData;
  userLevel: number;
}

/**
 * @param scoreData - Object containing users contributions, up- and downvotes
 * @param userLevel - Value representing the users overall level
 *
 * @returns Bar containing the users scores and level
 */
export const ScoreBar = ({
  scoreData,
  userLevel,
}: ScoreBarProps): React.ReactElement => {
  const { darkModeActive } = useContext(UserSettingsContext);

  return (
    <div
      className={`${
        darkModeActive ? "text-gray-200 bg-gray-800" : "text-gray-800 bg-white"
      } special-shadow rounded-4xl flex items-center px-6 py-1 gap-3 justify-center font-semibold`}
    >
      <div className="flex items-center">
        <h3 data-testid="indicator-claims-created">
          {scoreData.claimsCreated.length}
        </h3>
        <FontAwesomeIcon icon={faQuestion} className="text-blue-700 w-4 h-4" />
      </div>
      <div className="flex gap-1 items-center">
        <h3 data-testid="indicator-comments-created">
          {scoreData.commentsCreated.length}
        </h3>
        <FontAwesomeIcon icon={faGavel} className="text-red-700 w-4 h-4" />
      </div>
      <div className="flex gap-1 items-center">
        <h3 data-testid="indicator-upvotes-received">
          {scoreData.upvotesReceived}
        </h3>
        <FontAwesomeIcon
          icon={faHandshake}
          className="text-green-600 w-5 h-5"
        />
      </div>
      <div className="flex gap-1 items-center">
        <h3 data-testid="indicator-user-level">{userLevel}</h3>
        <FontAwesomeIcon icon={faStar} className="text-yellow-400 w-4 h-4" />
      </div>
    </div>
  );
};
