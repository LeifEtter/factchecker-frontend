import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../state/user";
import { API } from "../assets/constants";
import { ClaimCard } from "../components/cards/ClaimCard";

/**
 * @returns Page containing Currently logged in users submitted claims
 */
const Requests: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [ownClaims, setOwnClaims] = useState<Claim[]>([]);

  const calculateTruthFactor = (claim: Claim) => {
    if (claim.vote_false == 0 && claim.vote_true == 0) {
      return null;
    }
    const outcome =
      (claim.vote_true / (claim.vote_true + claim.vote_false)) * 100;
    return outcome;
  };

  useEffect(() => {
    const sessionUser: User = JSON.parse(sessionStorage.getItem("user"));
    if (!sessionUser) {
      router.push("/login");
    } else {
      fetch(`${API}/claims/own`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((body) => setOwnClaims(body));
    }
  }, [user, router]);

  return (
    <div>
      <div className="flex flex-col items-center mt-32">
        <div
          data-testid="claim-grid"
          className="inline-grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
        >
          <h1 className="text-2xl font-medium">Your Submitted Claims</h1>
          <div className="hidden xl:block"></div>
          <div className="hidden md:block"></div>
          {ownClaims.length > 0 ? (
            ownClaims.map((claim) => (
              <ClaimCard
                key={claim.id}
                claim={claim}
                onClick={() => {}}
                truthFactor={calculateTruthFactor(claim)}
              />
            ))
          ) : (
            <p>You haven`t submitted any claims yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
