import { useEffect, useState } from "react";
import { ClaimViewer } from "../components/ClaimViewer";
import { API } from "../assets/constants";
import { ClaimCard } from "../components/cards/ClaimCard";

const CLAIMS_SHOWN_AT_ONCE: number = 10;
/**
 * @returns Page containing claims received from backend
 */
export default function Home() {
  const [claims, setClaims] = useState<Claim[]>([]);

  const [claimViewerOpen, setClaimViewerOpen] = useState(false);
  const [claimBeingViewed, setClaimBeingViewed] = useState(null);
  const closeClaimViewer = () => {
    setClaimViewerOpen(false);
    setClaimBeingViewed(null);
  };
  const viewClaim = async (id: number) => {
    const claim: Claim = await getSingleClaim(id);
    setClaimBeingViewed(claim);
    setClaimViewerOpen(true);
  };

  const calculateTruthFactor = (claim: Claim) => {
    if (claim.vote_false == 0 && claim.vote_true == 0) {
      return null;
    }
    const outcome =
      (claim.vote_true / (claim.vote_true + claim.vote_false)) * 100;
    return outcome;
  };

  useEffect(() => {
    getAllClaims();
  }, []);

  const getAllClaims = async () => {
    const claimsResult = await fetch(
      `${API}/claims/query?limit=50&orderBy=comment_amount&category=&orderByDirection=ASC`,
      {
        method: "GET",
      }
    );
    if (claimsResult.status == 200) {
      const claims = await claimsResult.json();
      setClaims(claims);
    }
  };

  const getSingleClaim = async (id: number): Promise<Claim> => {
    try {
      const claimResult = await fetch(`${API}/claims/view/${id}`, {
        method: "GET",
      });
      if (claimResult.status == 200) {
        const decodedClaim: Claim = await claimResult.json();
        return decodedClaim;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <ClaimViewer
        claimViewerOpen={claimViewerOpen}
        closeClaimViewer={closeClaimViewer}
        claim={claimBeingViewed}
        truthFactor={
          claimBeingViewed != null ? calculateTruthFactor(claimBeingViewed) : 0
        }
      />
      <div className="flex flex-col items-center mt-32">
        <div
          data-testid="claim-grid"
          className="inline-grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
        >
          <h1 className="text-2xl font-medium">Posts/Articles</h1>
          <div className="hidden xl:block"></div>
          <div className="hidden md:block"></div>
          {claims.length != 0 ? (
            claims.map((claim) => {
              return (
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  onClick={() => viewClaim(claim.id)}
                  truthFactor={calculateTruthFactor(claim)}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row gap-2 mt-10" id="loading-dots">
          <span className="sr-only">Loading...</span>
          <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </main>
  );
}
