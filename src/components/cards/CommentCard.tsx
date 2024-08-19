import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CommentCardProps {
  comment: ClaimComment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
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
        <button className="bg-white p-2 pr-3 flex items-center gap-2 mt-3 rounded-lg shadow-md">
          Sources
          <FontAwesomeIcon icon={faCaretRight} fontSize={20} />
        </button>
        <div className="bg-white">
          {comment.sources.map((source) => (
            <p>{source}</p>
          ))}
        </div>
      </div>
    </>
  );
};
