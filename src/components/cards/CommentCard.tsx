import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

interface CommentCardProps {
  comment: ClaimComment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  return (
    <>
      <div
        className="mt-5 w-full rounded-2xl p-5 shadow-lg bg-fact-red flex flex-col items-start"
        style={{
          backgroundColor: comment.result == true ? "#B1EFA7" : "#FF9494",
        }}
        key={`comment-${comment.id}`}
      >
        {comment.statement}
        <button
          className="bg-white p-2 pr-3 flex items-center gap-2 mt-3 rounded-lg shadow-md"
          onClick={() => setSourcesOpen(!sourcesOpen)}
        >
          Sources
          <FontAwesomeIcon
            icon={sourcesOpen ? faCaretDown : faCaretRight}
            fontSize={20}
          />
        </button>
        <div
          className={`bg-white ${
            sourcesOpen ? "flex" : "hidden"
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
