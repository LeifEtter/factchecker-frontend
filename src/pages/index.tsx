import { ClaimCard, ClaimCardWithImage } from "../components/ClaimCard";
import { useEffect, useState } from "react";
import { ClaimViewer } from "../components/ClaimViewer";

const EXAMPLE_IMAGE =
  "https://factchecker-images.s3.eu-central-1.amazonaws.com/6f409519-6546-4d6d-987d-2cddeabfac8b";

export default function Home() {
  const [claims, setClaims] = useState([]);

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

  useEffect(() => {
    getAllClaims();
  }, []);

  const getAllClaims = async () => {
    const claimsResult = await fetch("http://localhost:3005/claims/", {
      method: "GET",
    });
    if (claimsResult.status == 200) {
      const claims = await claimsResult.json();
      setClaims(claims.result);
    }
  };

  const getSingleClaim = async (id: number): Promise<Claim> => {
    try {
      const claimResult = await fetch(
        `http://localhost:3005/claims/view/${id}`,
        {
          method: "GET",
        }
      );
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
      />
      <h1 className="text-2xl mt-20 font-medium mb-5">Posts/Articles</h1>
      <div
        data-testid="claim-grid"
        className="inline-grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
      >
        {/* {["one", "two", "three", "four"].map((element) => (
          <ClaimCard />
        ))} */}
        {claims.map((claim) => (
          <ClaimCardWithImage
            images={[EXAMPLE_IMAGE, EXAMPLE_IMAGE]}
            statement={claim.statement}
            description={claim.description}
            source={claim.source}
            userId={claim.user_id}
            key={claim.id}
            onClick={() => viewClaim(claim.id)}
          />
        ))}
      </div>
    </main>
  );
}
