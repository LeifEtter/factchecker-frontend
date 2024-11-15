import Image from "next/image";
import { Indicator } from "../Indicator";
import { SourceButton } from "../Buttons";
import { useContext } from "react";
import { UserSettingsContext } from "../../state/settings";

interface ClaimExpandedProps {
  claim: Claim;
  truthFactor: number;
  viewSource: Function;
}

/**
 * @param claim - Claim to be displayed
 * @param truthFactor - Number from 0-100 with 0 representing least true, and 100 most true
 * @param viewSource - Callback used for opening modal containing claims source
 *
 * @returns Expanded Claim Card that shows more information about the claim
 */
export const ClaimExpanded = ({
  claim,
  truthFactor,
  viewSource,
}: ClaimExpandedProps) => {
  const { darkModeActive } = useContext(UserSettingsContext);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-10/12 ${
        darkModeActive ? "bg-gray-800 text-gray-300" : "bg-white"
      } bg-opacity-100 rounded-3xl shadow-lg p-5 max-w-4xl mt-32`}
    >
      <div className="flex justify-between">
        <h1 className="font-bold">Claim</h1>
        <div className="flex-grow"></div>
        <SourceButton link={claim.source} onClick={viewSource} />
        <div className="w-5" />
        <Indicator validity={truthFactor} />
      </div>
      <p className="text-xl mt-2 mb-1">{claim.statement}</p>
      <article>{claim.description}</article>
      <div className="flex flex-row gap-6 mt-10 mb-3">
        {claim.images ? (
          claim.images.map((image) => (
            <div key={image.id} className="flex-1 relative h-64">
              <Image
                aria-label="Image supporting the Claim"
                className="object-cover rounded-3xl"
                src={image.link}
                alt={image.id + "-image"}
                fill
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
