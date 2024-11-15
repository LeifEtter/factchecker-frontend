import { useState, useEffect } from "react";
import { API } from "../assets/constants";

/**
 * Hook for fetching a single Claim
 *
 * @returns Fetched claim, Loading State, Function for setting claim to be fetched
 */
export function useFetchSingleClaim(): [Claim, boolean, Function] {
  const [singleClaimLoading, setSingleClaimLoading] = useState<boolean>(true);
  const [singleClaim, setSingleClaim] = useState<Claim>(null);
  const [viewClaimId, setViewClaimId] = useState<number>(null);

  useEffect(() => {
    if (!viewClaimId) return;
    setSingleClaimLoading(true);
    try {
      fetch(`${API}/claims/view/${viewClaimId}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((claim) => {
          setSingleClaim(claim);
          setSingleClaimLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [viewClaimId]);
  return [singleClaim, singleClaimLoading, setViewClaimId];
}
