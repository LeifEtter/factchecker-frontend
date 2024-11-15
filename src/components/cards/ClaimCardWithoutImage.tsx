import { useContext } from "react";
import { Indicator } from "../Indicator";
import { UserSettingsContext } from "../../state/settings";

// TODO Implement Claim Card without images

interface ClaimCardWithoutImageProps {
  claim: Claim;
  onClick: () => void;
  truthFactor: number;
}

/**
 * @param claim - Claim
 * @param onClick - Callback for when card is clicked
 * @param truthFactor - Number from 0-100 with 0 representing least true, and 100 most true
 *
 * @returns Claim Card with only text
 */
export const ClaimCardWithoutImage = ({
  claim,
  onClick,
  truthFactor,
}: ClaimCardWithoutImageProps) => {
  const { darkModeActive } = useContext(UserSettingsContext);

  return (
    <div>
      <div
        className={`flex flex-col transition-colors duration-300 ${
          darkModeActive
            ? "bg-gray-800 text-gray-300"
            : "bg-white special-shadow"
        } rounded-2xl max-w-sm h-72 overflow-hidden cursor-pointer`}
        onClick={onClick}
      >
        <div className="relative z-10 h-10 w-full">
          <Indicator validity={truthFactor} fullWidth={true} />
        </div>
        <div
          aria-label="Claim Statement"
          className="basis-7/12 flex flex-col p-3"
        >
          <h1 className="text-xl font-semibold">{claim.statement}</h1>
          <article aria-label="Claim Description">
            {claim.description.slice(0, 80) + "..."}
          </article>
        </div>
      </div>
    </div>
  );
};
