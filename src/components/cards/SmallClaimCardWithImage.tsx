import Image from "next/image";
import { Indicator } from "../Indicator";

interface SmallClaimCardWithImageProps {
  claim: Claim;
  onClick: Function;
  width?: string;
}

/**
 * @param claim - Claim with Images
 * @param onClick - Callback for when card is clicked
 * @param width - Width of claim card
 *
 * @returns Smaller claim card with images, shown on screens where claim cards
 * have less available space
 */
export const SmallClaimCardWithImage = ({
  claim,
  onClick,
  width,
}: SmallClaimCardWithImageProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl bg-white special-shadow h-44
             max-w-xs cursor-pointer"
      onClick={() => onClick()}
      style={{ width: width ?? null }}
    >
      <div className="flex justify-end">
        <div className="absolute text-xs w-34 h-10">
          <Indicator validity={35} />
        </div>
      </div>
      <div className="flex flex-col justify-between px-3 mt-3">
        <h1 className="font-bold">Claim</h1>
        <h3 className="font-medium text-xs break-words">{claim.statement}</h3>
        <div className="w-32 mt-2 h-20">
          <Image
            src={claim.images[0].link}
            priority
            alt={`avatar-image-appbar`}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg special-shadow w-full h-full mt-1 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
