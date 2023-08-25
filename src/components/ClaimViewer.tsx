import { useEffect } from "react";

export const ClaimViewer = ({ claimViewerOpen, closeClaimViewer, claimId }) => {
  useEffect(() => {
    console.log();
    if (claimId != null) getClaimForViewing(claimId);
  }, [claimId]);

  const getClaimForViewing = async (id) => {
    const claimResult = await fetch(`http://localhost:3005/claims/view/${id}`, {
      method: "GET",
    });
    if (claimResult.status == 200) {
      const claims = await claimResult.json();
    }
    console.log(claimResult);
  };

  return (
    <div
      className="z-50 bg-gray-400 bg-opacity-10 backdrop-blur-sm w-full h-full fixed left-0 top-0 flex items-center justify-center"
      style={{
        display: claimViewerOpen ? "flex" : "none",
      }}
      onClick={closeClaimViewer}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-3/6 w-10/12 bg-white fixed bg-opacity-100 rounded-lg shadow-lg p-5"
      >
        <h1>Claim</h1>
        <p>{claimId}</p>
      </div>
    </div>
  );
};
