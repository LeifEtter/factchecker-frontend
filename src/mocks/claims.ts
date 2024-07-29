import { randomInt } from "crypto";
import { lorem } from "./lorem";

// Generate Mock Claims | Outdated
export const mockClaims: Claim[] = Array(10)
  .fill(0)
  .map((_) => {
    const id: number = randomInt(999999);
    return {
      id,
      source: lorem.generateWords(3),
      statement: lorem.generateWords(10),
      description: lorem.generateWords(50),
      images: [
        {
          id,
          link: "https://factchecker-images.s3.eu-central-1.amazonaws.com/246/513fec43-c4f8-4961-869c-69e7d8cae72c",
          source: lorem.generateWords(2),
          claimId: 0,
        },
      ],
    };
  });
