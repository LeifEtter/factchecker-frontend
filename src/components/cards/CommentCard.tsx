import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserSettingsContext } from "../../state/settings";

interface CommentCardProps {
  comment: ClaimComment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const { darkModeActive } = useContext(UserSettingsContext);

  return (
    <>
      <div
        className={`${
          comment.result
            ? darkModeActive
              ? "bg-fact-green-dark text-gray-200"
              : "bg-fact-green"
            : darkModeActive
            ? "bg-fact-red-dark text-gray-200"
            : "bg-fact-red"
        } mt-5 w-full rounded-2xl p-5 shadow-lg flex flex-col items-start`}
        key={`comment-${comment.id}`}
      >
        {comment.statement}
        <button
          className={`${
            darkModeActive ? "bg-gray-800" : "bg-white"
          } p-2 pr-3 flex items-center gap-2 mt-3 rounded-lg shadow-md`}
          onClick={() => setSourcesOpen(!sourcesOpen)}
        >
          Sources
          <FontAwesomeIcon
            icon={sourcesOpen ? faCaretDown : faCaretRight}
            fontSize={20}
          />
        </button>
        <div
          className={`${sourcesOpen ? "flex" : "hidden"} ${
            darkModeActive ? "bg-gray-800" : "bg-white"
          } flex-col rounded-lg p-3 mt-3`}
        >
          {comment.sources.map((source, index) => (
            <div key={`source-${index}`}>
              <Link
                className="hover:scale-105 hover:font-semibold p-1 w-full rounded-md"
                href={source}
              >
                {source}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
