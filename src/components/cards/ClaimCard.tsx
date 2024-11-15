import { ClaimCardWithImage } from "./ClaimCardWithImage";
import { ClaimCardWithoutImage } from "./ClaimCardWithoutImage";
interface ClaimCard {
  claim: Claim;
  onClick: () => void;
  truthFactor: number;
}

/**
 * @param claim - Claim to be determined
 * @param onClick - Callback for when claim is clicked
 * @param truthFactor - Number from 0-100 with 0 representing least true, and 100 most true
 *
 * @returns Component that returns ClaimCard with or without image depending if
 * images are contained in the pack or not
 */
export const ClaimCard = ({ claim, onClick, truthFactor }) => {
  return claim.images.length > 0 ? (
    <ClaimCardWithImage
      claim={claim}
      onClick={onClick}
      truthFactor={truthFactor}
    />
  ) : (
    <ClaimCardWithoutImage
      claim={claim}
      onClick={onClick}
      truthFactor={truthFactor}
    />
  );
};
