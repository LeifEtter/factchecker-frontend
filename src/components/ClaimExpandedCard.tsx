import Image from "next/image";
import { Indicator } from "./Indicator";

interface ClaimExpandedProps {
  claim: Claim;
}

export const ClaimExpanded = ({ claim }: ClaimExpandedProps) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="w-10/12 bg-white bg-opacity-100 rounded-3xl shadow-lg p-5 max-w-4xl mt-32"
  >
    <div className="flex justify-between">
      <h1 className="font-bold">Claim</h1>
      <div className="flex-grow"></div>
      <div className="text-blue-400 p-2 shadow-md rounded-lg px-4 mr-5">
        Source
      </div>
      <Indicator validity={35} />
    </div>
    <p className="text-xl mt-2 mb-1">{claim.statement}</p>
    <p>{claim.description}</p>
    <div className="flex flex-row gap-6 mt-10 mb-3">
      {claim.images.map((image) => (
        <div key={image.id} className="flex-1 relative h-64">
          <Image
            className="object-cover rounded-3xl"
            src={image.link}
            alt={image.id + "-image"}
            fill
          />
        </div>
      ))}
    </div>
  </div>
);
