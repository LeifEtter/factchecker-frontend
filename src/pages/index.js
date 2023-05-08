import { ClaimCard, ClaimCardWithImage } from "@/components/ClaimCard";
import { useEffect, useState } from "react";

const EXAMPLE_IMAGE =
  "https://factchecker-images.s3.eu-central-1.amazonaws.com/6f409519-6546-4d6d-987d-2cddeabfac8b";

export default function Home() {
  const [claims, setClaims] = useState([]);

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

  return (
    <>
      <h1 className="text-lg mt-5 ml-5">Posts/Articles</h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-items-center border">
        {claims.map((claim) => (
          <ClaimCardWithImage
            images={[EXAMPLE_IMAGE, EXAMPLE_IMAGE]}
            statement={claim.statement}
            description={claim.description}
            source={claim.source}
            userId={claim.user_id}
            key={claim.id}
          />
        ))}
      </div>
    </>
  );
}
