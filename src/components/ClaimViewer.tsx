import Image from "next/image";
import { Indicator } from "./Indicator";

interface ClaimViewerProps {
  claimViewerOpen: boolean;
  closeClaimViewer: () => void;
  claim: Claim;
}

export const ClaimViewer = ({
  claimViewerOpen,
  closeClaimViewer,
  claim,
}: ClaimViewerProps) =>
  claimViewerOpen ? (
    <div
      className="z-50 bg-gray-400 bg-opacity-10 backdrop-blur-sm w-full h-full fixed left-0 top-0 flex items-center flex-col"
      onClick={closeClaimViewer}
    >
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
      <div className="w-10/12 bg-white bg-opacity-100 rounded-3xl shadow-lg p-5 mt-5 flex flex-row gap-8 max-w-4xl">
        <div className="flex-1">
          <h2 className="font-bold text-lg">Highlighted Reason</h2>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="w-32 border-red-500 border">graphic</div>
      </div>
    </div>
  ) : (
    <></>
  );
