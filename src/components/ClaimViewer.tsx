import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ClaimExpanded } from "./cards/ClaimExpandedCard";
import { HighlightCard } from "./HighlightCard";
import { ModalWrapper } from "./ModalWrapper";
import { useContext, useState } from "react";
import { UserSettingsContext } from "../state/settings";
import { isValidUrl } from "../helpers/validationHelpers";

interface ClaimViewerProps {
  claimViewerOpen: boolean;
  closeClaimViewer: () => void;
  claim: Claim;
  truthFactor: number;
}

/**
 * @param claimViewerOpen - Boolean representing open state of ClaimViewer
 * @param closeClaimViewer - Callback function that closes the ClaimViewer
 * @param claim - Claim to be viewed
 * @param truthFactor - Number from 0-100 with 0 representing least true, and 100 most true
 *
 * @returns Component that overlays over the current page;
 * Serves to view claims more in-depth, without having to navigate to new page
 */
export const ClaimViewer = ({
  claimViewerOpen,
  closeClaimViewer,
  claim,
  truthFactor,
}: ClaimViewerProps) => {
  const { darkModeActive } = useContext(UserSettingsContext);

  const [viewingSource, setViewingSource] = useState(false);

  return claimViewerOpen ? (
    <div
      className={`z-50 bg-gray-400 bg-opacity-10 backdrop-blur-sm w-full h-full fixed left-0 top-0 flex items-center flex-col`}
      onClick={closeClaimViewer}
    >
      <ClaimExpanded
        claim={claim}
        truthFactor={truthFactor}
        viewSource={() => setViewingSource(true)}
      />
      {claim.comments && claim.comments.length > 0 ? (
        <HighlightCard comment={claim.comments[0]} />
      ) : (
        <></>
      )}
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
      <ModalWrapper
        isOpen={viewingSource}
        closeModal={() => setViewingSource(false)}
      >
        {isValidUrl(claim.source) ? (
          <Link href={claim.source}></Link>
        ) : (
          <p>Source: {claim.source}</p>
        )}
      </ModalWrapper>
    </div>
  ) : (
    <></>
  );
};
