import { useContext, useEffect, useState } from "react";
import { SORTING_OPTION_LABELS, SORTING_OPTIONS } from "../assets/constants";
import { ClaimCard } from "../components/cards/ClaimCard";
import { UserSettingsContext } from "../state/settings";
import { useScrollTracker } from "../hooks/useScrollTracker";
import { LoadingDots } from "../components/LoadingDots";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useFetchClaims } from "../hooks/useFetchClaims";
import { capitalizeString } from "../helpers/conversionHelpers";
import { calculateTruthFactor } from "../helpers/calculationHelpers";
import Head from "next/head";

/**
 * @returns Page containing Explore Options to find different posts and articles
 */
export default function Explore() {
  const { darkModeActive } = useContext(UserSettingsContext);

  const [categoriesIsLoading, categories, setCategories] = useFetchCategories();
  // const [moreFilters, setMoreFilters] = useState<object>({
  //   0: { name: "Undecided", active: false },
  //   1: { name: "True", active: false },
  //   2: { name: "False", active: false },
  //   3: { name: "Text-Only", active: false },
  // });
  const initialClaimQuery: ClaimQuery = {
    endpoint: "claims/query",
    limit: 15,
    skip: 0,
    orderBy: SORTING_OPTIONS[0],
    orderByDirection: "DESC",
    category: categories,
    keywords: "",
  };
  const [claimQuery, setClaimQuery, claims, claimsIsLoading] =
    useFetchClaims(initialClaimQuery);
  const resetSkip = () => setClaimQuery({ ...claimQuery, skip: 0 });

  // const viewClaim = async (id: number) => {
  //   const claim: Claim = await getSingleClaim(id);
  //   setClaimBeingViewed(claim);
  //   setClaimViewerOpen(true);
  // };

  const onBottomReach = async () => {
    if (claims.length < claimQuery.skip + 15) return;
    setClaimQuery({ ...claimQuery, skip: (claimQuery.skip += 15) });
  };
  const [setTrackedElem] = useScrollTracker(claims, onBottomReach);
  useEffect(() => setTrackedElem(document.querySelector("#loading-dots")), []);

  useEffect(
    () => setClaimQuery({ ...claimQuery, category: categories }),
    [categories]
  );

  return (
    <div>
      <Head>
        <title>Explore Claims with Filters</title>
        <meta
          name="description"
          content="Here you can Filter and Sort through all the submitted Claims"
        />
        <meta name="keywords" content="Truth,Lie,Fake,Claim,Sort" />
      </Head>
      <div
        className={`${darkModeActive ? "text-gray-200" : "text-black"} px-12`}
      >
        <div className="flex flex-col flex-wrap md:flex-row w-full mt-12 gap-3">
          <div className="w-3/6">
            <label htmlFor="search-input">Search</label>
            <input
              id="search-input"
              className={`${
                darkModeActive ? "bg-gray-700" : "bg-white"
              } w-full max-w-lg h-10 special-shadow rounded-xl border-md px-3 mt-2`}
              type="text"
              placeholder="Goldfish have a 7-sec memory..."
              value={claimQuery.keywords}
              onChange={(e) =>
                setClaimQuery({
                  ...claimQuery,
                  keywords: e.target.value,
                  skip: 0,
                })
              }
            />
          </div>
          <div className="w-36 md:1/6 group">
            <label htmlFor="sort-by">Sort By</label>
            <button
              id="sort-by"
              className={`${
                darkModeActive ? "bg-gray-700" : "bg-white"
              } rounded-xl special-shadow h-10 px-3 w-40 mt-2 hover:scale-105`}
            >
              {SORTING_OPTION_LABELS[claimQuery.orderBy]}
            </button>
            <div className="h-3" />
            <div
              className={`${
                darkModeActive ? "bg-gray-700" : "bg-white"
              } absolute z-50 hidden group-hover:flex flex-col h-26 w-40 gap-2 p-3 rounded-xl special-shadow`}
            >
              {SORTING_OPTIONS.map((option) => (
                <button
                  key={`option-${option}`}
                  className={`hover:scale-105 hover:font-semibold rounded-md p-1 ${
                    option == claimQuery.orderBy
                      ? darkModeActive
                        ? "text-white font-semibold fact-gradient-dark"
                        : "fact-gradient"
                      : ""
                  }`}
                  onClick={() =>
                    setClaimQuery({ ...claimQuery, orderBy: option, skip: 0 })
                  }
                >
                  {SORTING_OPTION_LABELS[option]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="filter-by">Filter by Categories</label>
            <div id="filter-by" className="flex flex-row flex-wrap gap-3 mt-2">
              {!categoriesIsLoading && categories != null
                ? Object.keys(categories).map((cat) => (
                    <button
                      key={`${cat}-catButton`}
                      className={`px-3 py-1 special-shadow rounded-xl hover:scale-105 hover:font-semibold ${
                        categories[cat].active
                          ? darkModeActive
                            ? "text-white fact-gradient-dark"
                            : "fact-gradient"
                          : darkModeActive
                          ? "bg-gray-800"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        categories[cat].active = !categories[cat].active;
                        setCategories({ ...categories });
                        resetSkip();
                      }}
                    >
                      {capitalizeString(categories[cat].name)}
                    </button>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div
          data-testid="claim-grid"
          className="inline-grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10"
        >
          {claims && claims.length != 0 ? (
            claims.map((claim) => {
              return (
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  // onClick={() => viewClaim(claim.id)}
                  onClick={() => {}}
                  truthFactor={calculateTruthFactor(claim)}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-center pb-5">
          <LoadingDots />
        </div>
      </div>
    </div>
  );
}
