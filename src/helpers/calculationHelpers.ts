/**
 * Function that calculates the Truth Factor for a claim
 *
 * @param claim - Claim for which Truth Factor needs to be calculated
 * @returns Value between 0 (least truthful) and 100 (most truthful)
 */
export const calculateTruthFactor = (claim: Claim) => {
  if (claim.vote_false == 0 && claim.vote_true == 0) {
    return null;
  }
  const outcome =
    (claim.vote_true / (claim.vote_true + claim.vote_false)) * 100;
  return outcome;
};
