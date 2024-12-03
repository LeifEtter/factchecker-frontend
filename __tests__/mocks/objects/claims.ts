import { generateClaimImage } from "./images";

export const generateClaim = (claimId: number): Claim => ({
  id: claimId,
  source: "https://www.x.com",
  statement: "Pigs could fly",
  description:
    "Pigs lost their ability to fly when evolution devolved their wings",
  images: [generateClaimImage(claimId)],
});
