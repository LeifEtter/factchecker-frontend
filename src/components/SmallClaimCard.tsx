import Image from "next/image";
import { Indicator } from "./Indicator";

interface SmallClaimCardProps {
  claim: Claim;
  onClick: Function;
  width?: string;
}

export const SmallClaimCard = ({
  claim,
  onClick,
  width,
}: SmallClaimCardProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl bg-white special-shadow h-36
             max-w-xs cursor-pointer"
      onClick={() => onClick()}
      style={{ width: width ?? null }}
    >
      <div className="flex justify-end">
        <div className="absolute text-xs w-16 h-10">
          <Indicator validity={35} />
        </div>
      </div>
      <div className="flex flex-row justify-between px-3 mt-3">
        <h3 className="font-semibold text-sm mr-20 break-words">
          {claim.statement}
        </h3>
      </div>
      {claim.images ? (
        <Image
          src={claim.images[0].link}
          priority
          alt={`avatar-image-appbar`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-full special-shadow"
        />
      ) : (
        <p className="break-words px-3 pt-4 text-sm">
          {claim.description.slice(0, 50) + "..."}
        </p>
      )}
    </div>
  );
};
