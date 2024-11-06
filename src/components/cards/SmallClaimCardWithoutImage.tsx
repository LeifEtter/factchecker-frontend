import Image from "next/image";
import { Indicator } from "../Indicator";
import { useContext } from "react";
import { UserSettingsContext } from "../../state/settings";

interface SmallClaimCardWithoutImageProps {
  claim: Claim;
  onClick: Function;
  width?: string;
  truthValue: number;
}

/**
 * @param claim - Claim without images
 * @param onClick - Callback for when card is clicked
 * @param width - Width of claim card
 * @param truthFactor - Number from 0-100 with 0 representing least true, and 100 most true
 *
 * @returns Smaller claim card with only Text, shown on screens where claim cards
 * have less available space
 */
export const SmallClaimCardWithoutImage = ({
  claim,
  onClick,
  width,
  truthValue,
}: SmallClaimCardWithoutImageProps) => {
  const { darkModeActive } = useContext(UserSettingsContext);

  return (
    <div
      className={`${
        darkModeActive ? "bg-gray-800" : "bg-white"
      } flex flex-col rounded-2xl special-shadow h-44
             max-w-xs cursor-pointer`}
      onClick={() => onClick()}
      style={{ width: width ?? null }}
    >
      <div className="flex justify-end">
        <div className="absolute text-xs w-22 h-10">
          <Indicator validity={truthValue} />
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
