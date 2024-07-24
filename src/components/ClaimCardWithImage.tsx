import { default as Image } from "next/image";
import { Indicator } from "./Indicator";

// TODO Implement Claim Card without images

interface ClaimCardWithImageProps {
  claim: Claim;
  onClick: () => void;
}

export const ClaimCardWithImage = ({
  claim,
  onClick,
}: ClaimCardWithImageProps) => (
  <div>
    <div
      className="flex flex-col bg-white rounded-2xl special-shadow max-w-sm h-72 overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute z-10 h-10">
        <Indicator validity={35} />
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
