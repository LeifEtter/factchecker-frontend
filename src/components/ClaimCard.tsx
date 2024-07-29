import { ClaimCardWithImage } from "./ClaimCardWithImage";
import { ClaimCardWithoutImage } from "./ClaimCardWithoutImage";

interface ClaimCard {
  claim: Claim;
  onClick: () => void;
}

/**
 * @param claim - Claim to be determined
 * @param onClick - Callback for when claim is clicked
 *
 * @returns Component that returns ClaimCard with or without image depending if
 * images are contained in the pack or not
 */
export const ClaimCard = ({ claim, onClick }) =>
  claim.images.length > 0 ? (
    <ClaimCardWithImage claim={claim} onClick={onClick} />
  ) : (
    <ClaimCardWithoutImage claim={claim} onClick={onClick} />
  );
