import { useEffect, useState } from "react";

import { default as Image } from "next/image";
import { Indicator } from "../Indicator";

// TODO Implement Claim Card without images

interface ClaimCardWithoutImageProps {
  claim: Claim;
  onClick: () => void;
}

/**
 * @param claim - Claim
 * @param onClick - Callback for when card is clicked
 *
 * @returns Claim Card with only text
 */
export const ClaimCardWithoutImage = ({
  claim,
  onClick,
}: ClaimCardWithoutImageProps) => (
  <div>
    <div
      className="flex flex-col bg-white rounded-2xl special-shadow max-w-sm h-72 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative z-10 h-10 w-full">
        <Indicator validity={35} fullWidth={true} />
      </div>
      <div className="basis-7/12 flex flex-col p-3">
        <h1 className="text-xl font-semibold">{claim.statement}</h1>
        <p>{claim.description.slice(0, 80) + "..."}</p>
      </div>
    </div>
  </div>
);
