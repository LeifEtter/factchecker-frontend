import { useState, useEffect } from "react";
import { API } from "../assets/constants";

/**
 * @param userId current users id
 * @returns Hook used for getting the currently logged in users scores
 */
export function useFetchCategories(): [boolean, ClaimCategoryDict, Function] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ClaimCategoryDict>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`${API}/category`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((categories: ClaimCategory[]) => {
          let catsAsObject: ClaimCategoryDict = {};
          categories.forEach(
            (cat) => (catsAsObject[cat.id] = { name: cat.name, active: false })
          );
          setCategories(catsAsObject);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return [isLoading, categories, setCategories];
}
