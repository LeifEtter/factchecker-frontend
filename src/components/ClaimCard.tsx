import { ClaimCardWithImage } from "./ClaimCardWithImage";
import { ClaimCardWithoutImage } from "./ClaimCardWithoutImage";

interface ClaimCard {
  claim: Claim;
  onClick: () => void;
}

export const ClaimCard = ({ claim, onClick }) =>
  claim.images.length > 0 ? (
    <ClaimCardWithImage claim={claim} onClick={onClick} />
  ) : (
    <ClaimCardWithoutImage claim={claim} onClick={onClick} />
  );
