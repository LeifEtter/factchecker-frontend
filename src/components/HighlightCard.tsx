interface HighlightCard {
  comment: ClaimComment;
}

/**
 * @param comment - Comment of Claim being evaluated
 *
 * @returns Card used in ClaimViewer that represents the highlighted comment on why something is False/True
 */
export const HighlightCard = ({ comment }: HighlightCard) => (
  <div className="w-10/12 bg-white bg-opacity-100 rounded-3xl shadow-lg p-5 mt-5 flex flex-row gap-8 max-w-4xl">
    <div className="flex-1">
      <h2 className="font-bold text-lg">Highlighted Reason</h2>
      <p>{comment.statement}</p>
    </div>
    {/* <div className="w-32 border-red-500 border">graphic</div> */}
  </div>
);
