export const generateClaimImage = (claimId: number): ClaimImage => ({
  link: "https://leif-test-bucket.s3.eu-central-1.amazonaws.com/test-claim-image.png",
  source: "https://www.x.com",
  claimId: claimId,
});
