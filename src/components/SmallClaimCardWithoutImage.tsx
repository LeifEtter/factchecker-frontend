import Image from "next/image";
import { Indicator } from "./Indicator";

interface SmallClaimCardWithoutImageProps {
  claim: Claim;
  onClick: Function;
  width?: string;
}

/**
 * @param claim - Claim without images
 * @param onClick - Callback for when card is clicked
 * @param width - Width of claim card
 *
 * @returns Smaller claim card with only Text, shown on screens where claim cards
 * have less available space
 */
export const SmallClaimCardWithoutImage = ({
  claim,
  onClick,
  width,
}: SmallClaimCardWithoutImageProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl bg-white special-shadow h-44
             max-w-xs cursor-pointer"
      onClick={() => onClick()}
      style={{ width: width ?? null }}
    >
      <div className="flex justify-end">
        <div className="absolute text-xs w-22 h-10">
          <Indicator validity={35} />
        </div>
      </div>
      <div className="flex justify-between px-3 mt-3 flex-col">
        <h1 className="font-bold">Claim</h1>
        <h3 className="mt-2 font-medium text-xs break-words">
          {claim.statement}
        </h3>
        <p className="mt-2 font-light text-xs break-words">
          {claim.description}
        </p>
      </div>
      {/* <p className="break-words px-3 pt-4 text-sm">
        {claim.description.slice(0, 50) + "..."}
      </p> */}
    </div>
  );
};
