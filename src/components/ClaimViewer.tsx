export const ClaimViewer = ({ claimViewerOpen, closeClaimViewer, claim }) =>
  claimViewerOpen ? (
    <div
      className="z-50 bg-gray-400 bg-opacity-10 backdrop-blur-sm w-full h-full fixed left-0 top-0 flex items-center justify-center"
      onClick={closeClaimViewer}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-3/6 w-10/12 bg-white fixed bg-opacity-100 rounded-lg shadow-lg p-5"
      >
        <h1>Claim</h1>
        <p>{claim.statement}</p>
        <p>{claim.description}</p>
      </div>
      {claim.comments.map((comment) => (
        <div key={comment.id}>{comment.statement}</div>
      ))}
    </div>
  ) : (
    <></>
  );
