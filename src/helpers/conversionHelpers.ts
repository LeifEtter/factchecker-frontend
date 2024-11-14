/**
 * Function that capitalizes first letter of string
 *
 * @param word - string to be capitalized
 *
 * @returns Capitalized String
 */
export const capitalizeString = (word: string) =>
  word ? word.charAt(0).toUpperCase() + word.substring(1).toLowerCase() : "";

/**
 * Function that removes special characters at the end of a given string
 *
 * @param str String to be cleaned from trailing special characters
 * @returns String without trailing special chars
 */
export const cleanTrailingSpecialChars = (str: string) => {
  const specialChars = ["&", ",", "=", " "];
  if (specialChars.includes(str.charAt(str.length - 1))) str = str.slice(0, -1);
  return str;
};

/**
 * Function that converts a query object into a query string
 *
 * @param query Query Object containing info on what resources to fetch
 * @returns String form of Query Object
 */
export const constructQueryUrl = (query: ClaimQuery | UserQuery): string => {
  let queryString = `${query.endpoint}?limit=${query.limit}&skip=${query.skip}&orderBy=${query.orderBy}&orderByDirection=${query.orderByDirection}&`;
  if (!("category" in query)) {
    return queryString;
  }
  queryString += "category=";
  for (let [_, value] of Object.entries(query.category)) {
    const categoryButtonData: ClaimCategoryButtonData = value;
    if (categoryButtonData.active) queryString += `${categoryButtonData.name},`;
  }
  queryString = cleanTrailingSpecialChars(queryString);
  if (query.keywords != "") {
    const keywords = query.keywords.replaceAll(" ", ",");
    queryString += `&keywords=${keywords}`;
  }
  return queryString;
};
