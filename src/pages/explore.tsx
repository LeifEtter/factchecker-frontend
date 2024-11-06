import { useContext, useEffect, useState } from "react";
import { API } from "../assets/constants";
import { capitalizeString } from "../helpers/helpers";
import { ClaimCard } from "../components/cards/ClaimCard";
import { UserSettingsContext } from "../state/settings";

/**
 * @returns Page containing Explore Options to find different posts and articles
 */
export default function Explore() {
  const [claims, setClaims] = useState([]);
  const { darkModeActive } = useContext(UserSettingsContext);
  const allSortingOptions = ["Popularity", "Date Created", "Controversial"];
  const [chosenSortingOption, setChosenSortingOption] = useState(
    allSortingOptions[0]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState<object>(null);

  const [moreFilters, setMoreFilters] = useState<object>({
    0: { name: "Undecided", active: false },
    1: { name: "True", active: false },
    2: { name: "False", active: false },
    3: { name: "Text-Only", active: false },
  });

  // const viewClaim = async (id: number) => {
  //   const claim: Claim = await getSingleClaim(id);
  //   setClaimBeingViewed(claim);
  //   setClaimViewerOpen(true);
  // };

  const calculateTruthFactor = (claim: Claim) => {
    if (claim.vote_false == 0 && claim.vote_true == 0) {
      return null;
    }
    const outcome =
      (claim.vote_true / (claim.vote_true + claim.vote_false)) * 100;
    return outcome;
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    queryClaims();
  }, [categories, chosenSortingOption, searchQuery]);

  const getAllCategories = async () => {
    const result = await fetch(`${API}/category`, {
      method: "GET",
    });
    if (result.status == 200) {
      const categories: ClaimCategory[] = await result.json();
      let catsAsObject: object = {};
      categories.forEach(
        (cat) => (catsAsObject[cat.id] = { name: cat.name, active: false })
      );
      setCategories(catsAsObject);
    }
  };

  const queryClaims = async () => {
    if (categories) {
      let categoryString: string = "";
      Object.keys(categories).forEach((cat) => {
        if (categories[cat].active) {
          categoryString += categories[cat].name + ",";
        }
      });
      if (categoryString.endsWith(",")) {
        categoryString = categoryString.substring(0, categoryString.length - 1);
      }
      let orderBy: string = "";
      if (chosenSortingOption == "Popularity") {
        orderBy = "comment_amount";
      } else if (chosenSortingOption == "Date Created") {
        orderBy = "creation_date";
      }
      let keywords = "";
      if (searchQuery) {
        searchQuery.replaceAll(" ", ",");
      }
      const claimsResult = await fetch(
        `${API}/claims/query?limit=50&orderBy=${orderBy}&category=${categoryString}&orderByDirection=ASC&keywords=${keywords}`,
        {
          method: "GET",
        }
      );
      if (claimsResult.status == 200) {
        const claims = await claimsResult.json();
        setClaims(claims);
      }
    }
  };

  return (
    <main
      className={`${darkModeActive ? "text-gray-200" : "text-black"} px-12`}
    >
      <div className="flex flex-col flex-wrap md:flex-row w-full mt-12 gap-3">
        <div className="w-3/6">
          <h3>Search</h3>
          <input
            id="search-input"
            className={`${
              darkModeActive ? "bg-gray-700" : "bg-white"
            } w-full max-w-lg h-10 special-shadow rounded-xl border-md px-3 mt-2`}
            type="text"
            placeholder="Goldfish have a 7-sec memory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-36 md:1/6 group">
          <h3>Sort By</h3>
          <button
            className={`${
              darkModeActive ? "bg-gray-700" : "bg-white"
            } rounded-xl special-shadow h-10 px-3 w-40 mt-2`}
          >
            {chosenSortingOption}
          </button>
          <div className="h-3" />
          <div
            className={`${
              darkModeActive ? "bg-gray-700" : "bg-white"
            } absolute z-50 hidden group-hover:flex flex-col h-26 w-40 gap-2 p-3 rounded-xl special-shadow`}
          >
            {allSortingOptions.map((option) => (
              <button
                key={`option-${option}`}
                className={`hover:scale-105 hover:font-semibold rounded-md p-1 ${
                  option == chosenSortingOption
                    ? "text-white font-semibold" + darkModeActive
                      ? "fact-gradient-dark"
                      : "fact-gradient"
                    : ""
                }`}
                onClick={() => {
                  setChosenSortingOption(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3>Filter by Categories</h3>
          <div className="flex flex-row flex-wrap gap-3 mt-2">
            {categories != null
              ? Object.keys(categories).map((cat) => (
                  <button
                    key={`${cat}-catButton`}
                    className={`px-3 py-1 special-shadow rounded-xl ${
                      categories[cat].active
                        ? "text-white" + darkModeActive
                          ? "fact-gradient-dark"
                          : "fact-gradient"
                        : darkModeActive
                        ? "bg-gray-700"
                        : "bg-white"
                    }`}
                    onClick={() => {
                      categories[cat].active = !categories[cat].active;
                      setCategories({ ...categories });
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
        {claims.length != 0 ? (
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
    </main>
  );
}
