import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../state/token";
import jwtDecode from "jwt-decode";
import { Token } from "../token";
import { ClaimCardWithImage } from "../components/ClaimCard";

const Requests: React.FC = () => {
  const { token } = useContext(TokenContext);
  const [ownClaims, setOwnClaims] = useState<Claim[]>([]);

  useEffect(() => {
    if (token) {
      fetch(
        `http://localhost:3005/claims/user/${jwtDecode<Token>(token).user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((result) => result.json())
        .then((body) => setOwnClaims(body.result));
    }
  }, [token]);

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
          {ownClaims.map((claim) => (
            <ClaimCardWithImage
              key={claim.id}
              images={claim.images}
              statement={claim.statement}
              source={claim.source}
              description={claim.description}
              onClick={() => {}}
              userId={1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
