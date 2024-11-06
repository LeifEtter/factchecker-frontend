import { default as Image } from "next/image";
import { Indicator } from "../Indicator";
import { useContext } from "react";
import { UserSettingsContext } from "../../state/settings";

// TODO Implement Claim Card without images

interface ClaimCardWithImageProps {
  claim: Claim;
  onClick: () => void;
  truthFactor: number;
}

/**
 * @param claim - Claim
 * @param onClick - Callback for when card is clicked
 * @param truthFactor - Number from 0-100 with 0 representing least true, and 100 most true
 *
 * @returns Claim Card with images
 */
export const ClaimCardWithImage = ({
  claim,
  onClick,
  truthFactor,
}: ClaimCardWithImageProps) => {
  const { darkModeActive } = useContext(UserSettingsContext);

  return (
    <div>
      <div
        className={`flex flex-col ${
          darkModeActive
            ? "bg-gray-800 text-gray-300"
            : "bg-white special-shadow"
        } rounded-2xl max-w-sm h-72 overflow-hidden cursor-pointer transition-colors duration-300`}
        onClick={onClick}
      >
        <div className="absolute z-10 h-10">
          <Indicator validity={truthFactor} />
        </div>
        <div className="basis-6/12 w-full flex flex-row">
          {claim.images.map((image, index) => (
            <div className="flex-1 relative" key={image + "-container" + index}>
              <Image
                priority
                src={image.link}
                alt={`${image}-image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="basis-7/12 flex flex-col p-3">
          <h1 className="text-xl font-semibold">{claim.statement}</h1>
          <p>{claim.description.slice(0, 80) + "..."}</p>
        </div>
      </div>
    </div>
  );
};
