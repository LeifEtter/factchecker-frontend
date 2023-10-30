import React, { useCallback, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { ClaimCardWithImage } from "../components/ClaimCard";
import { useRouter } from "next/router";
import { UserContext } from "../state/user";

const Requests: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [ownClaims, setOwnClaims] = useState<Claim[]>([]);

  useEffect(() => {
    const sessionUser: User = JSON.parse(sessionStorage.getItem("user"));
    if (!sessionUser) {
      router.push("/login");
    } else {
      fetch(`http://localhost:3005/claims/user/${sessionUser.id}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((body) => setOwnClaims(body.result));
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
