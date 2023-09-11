import Image from "next/image";
import { Indicator } from "./Indicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ClaimExpanded } from "./ClaimExpandedCard";
import { HighlightCard } from "./HighlightCard";

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
      <ClaimExpanded claim={claim} />
      <HighlightCard claim={claim} />
      <Link
        href={`/view-single-claim/${claim.id}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="mt-5 w-10/12 p-5 rounded-3xl bg-blue-400 flex flex-row max-w-4xl"
      >
        <p className="font-bold ">View Statements/Reasons</p>
        <div>
          <FontAwesomeIcon icon={faComments} size="1x" className="ml-2" />
        </div>
      </Link>
    </div>
  ) : (
    <></>
  );
