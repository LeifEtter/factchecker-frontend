import { use, useContext, useEffect, useState } from "react";
import { ClaimViewer } from "../components/ClaimViewer";
import { API, SORTING_OPTIONS } from "../assets/constants";
import { ClaimCard } from "../components/cards/ClaimCard";
import { UserSettingsContext } from "../state/settings";
import { LoadingDots } from "../components/LoadingDots";
import { useScrollTracker } from "../hooks/useScrollTracker";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useFetchClaims } from "../hooks/useFetchClaims";
import { useFetchSingleClaim } from "../hooks/useFetchSingleClaim";
import { calculateTruthFactor } from "../helpers/calculationHelpers";
import Head from "next/head";

const CLAIMS_SHOWN_AT_ONCE: number = 10;

/**
 * @returns Page containing claims received from backend
 */
export default function Home() {
  const { darkModeActive } = useContext(UserSettingsContext);
  const [claimViewerOpen, setClaimViewerOpen] = useState(false);
  const [x, categories, z] = useFetchCategories();

  const initialClaimQuery: ClaimQuery = {
    endpoint: "claims/query",
    limit: CLAIMS_SHOWN_AT_ONCE,
    skip: 0,
    orderBy: SORTING_OPTIONS[0],
    orderByDirection: "DESC",
    category: categories,
    keywords: "",
  };
  const [claimQuery, setClaimQuery, claims, claimsIsLoading] =
    useFetchClaims(initialClaimQuery);

  useEffect(
    () => setClaimQuery({ ...claimQuery, category: categories }),
    [categories]
  );

  const [singleClaim, singleClaimLoading, setViewClaimId] =
    useFetchSingleClaim();

  useEffect(() => {
    if (singleClaim && !singleClaimLoading) setClaimViewerOpen(true);
  }, [singleClaim]);

  const onBottomReach = async () => {
    if (claims.length < claimQuery.skip + CLAIMS_SHOWN_AT_ONCE) return;
    setClaimQuery({
      ...claimQuery,
      skip: (claimQuery.skip += CLAIMS_SHOWN_AT_ONCE),
    });
  };

  const [setTrackedElem] = useScrollTracker(claims, onBottomReach);
  useEffect(() => setTrackedElem(document.querySelector("#loading-dots")), []);

  return (
    <div>
      <Head>
        <title>Factchecker Homepage</title>
        <meta
          name="description"
          content="Get an overview of claims and your submissions"
        />
        <meta
          name="keywords"
          content="facts,claims,factchecker,truth,true,false"
        />
      </Head>
      <main>
        <ClaimViewer
          claimViewerOpen={claimViewerOpen}
          closeClaimViewer={() => setClaimViewerOpen(false)}
          claim={singleClaim}
          truthFactor={
            singleClaim != null ? calculateTruthFactor(singleClaim) : 0
          }
        />
        <div className="flex flex-col items-center mt-32">
          <div
            data-testid="claim-grid"
            className="inline-grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
          >
            <h1
              className={`text-2xl font-medium ${
                darkModeActive ? "text-gray-300" : "text-black"
              }`}
            >
              Posts/Articles
            </h1>
            <div className="hidden xl:block"></div>
            <div className="hidden md:block"></div>
            {claims && claims.length != 0 ? (
              claims.map((claim) => {
                return (
                  <ClaimCard
                    key={claim.id}
                    claim={claim}
                    onClick={() => setViewClaimId(claim.id)}
                    truthFactor={calculateTruthFactor(claim)}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <LoadingDots />
        </div>
      </main>
    </div>
  );
}
