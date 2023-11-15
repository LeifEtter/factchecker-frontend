import {
  faGavel,
  faHandshake,
  faQuestion,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ScoreData } from "../hooks/useScoreData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScoreBarProps {
  scoreData: ScoreData;
  userLevel: number;
}

export const ScoreBar = ({
  scoreData,
  userLevel,
}: ScoreBarProps): React.ReactElement => (
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
);
