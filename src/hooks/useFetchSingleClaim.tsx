import { useState, useEffect } from "react";
import { API } from "../assets/constants";

/**
 * @param userId current users id
 * @returns Hook used for getting the currently logged in users scores
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
