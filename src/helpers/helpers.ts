/**
 * Function that evaluates wether an email is valid or not
 *
 * @param email - Email to be checked
 *
 * @returns Boolean representing wether email is valid or not
 */
export const isEmail = (email: String): boolean => {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email !== "" && email.match(emailFormat) ? true : false;
};

/**
 * Function that evaluates wether a password is strong enough or not
 *
 * @param password - Password to evaluate
 *
 * @returns Boolean representing wether or not password is strong enough
 */
export const isPassword = (password: String): boolean => {
  var passwordFormat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return password !== "" && password.match(passwordFormat) ? true : false;
};

// interface IsTokenValidType {
//   (token: string): Promise<boolean>;
// }

// export const isTokenValid: IsTokenValidType = async (token) => {
//   const res = await fetch(`${API}/users/authenticate`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (res.status == 200) {
//     return true;
//   } else {
//     return false;
//   }
// };

/**
 * Function that evaluates wether a string is a valid url or not
 *
 * @param url - string to be evaluated
 *
 * @returns Boolean representing wether or not url is valid
 */
export const isValidUrl = (url: string) => /^[a-z]+:\/\//i.test(url);

/**
 * Function that capitalizes first letter of string
 *
 * @param word - string to be capitalized
 *
 * @returns Capitalized String
 */
export const capitalizeString = (word: string) =>
  word ? word.charAt(0).toUpperCase() + word.substring(1).toLowerCase() : "";
