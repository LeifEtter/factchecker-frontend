import { useState, useEffect } from "react";
import { API } from "../assets/constants";
import { constructQueryUrl } from "../helpers/conversionHelpers";

/**
 * @param userId current users id
 * @returns Hook used for getting the currently logged in users scores
 */
export function useFetchClaims(
  initialQuery: ClaimQuery
): [ClaimQuery, Function, Claim[], boolean] {
  const [isLoading, setIsLoading] = useState(true);
  const [claimQuery, setClaimQuery] = useState<ClaimQuery>(initialQuery);
  const [claims, setClaims] = useState<Claim[]>();

  useEffect(() => {
    if (!claimQuery || !claimQuery.category) return;
    setIsLoading(true);
    const queryString: string = constructQueryUrl(claimQuery);
    try {
      fetch(`${API}/${queryString}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((newClaims) => {
          if (claims && claims.length != 0 && claimQuery.skip != 0) {
            setClaims([...claims, ...newClaims]);
          } else {
            setClaims(newClaims);
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [claimQuery]);
  return [claimQuery, setClaimQuery, claims, isLoading];
}
