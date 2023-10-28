export const isEmail = (email: String): boolean => {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email !== "" && email.match(emailFormat) ? true : false;
};

export const isPassword = (password: String): boolean => {
  var passwordFormat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return password !== "" && password.match(passwordFormat) ? true : false;
};

// interface IsTokenValidType {
//   (token: string): Promise<boolean>;
// }

// export const isTokenValid: IsTokenValidType = async (token) => {
//   const res = await fetch("http://localhost:3005/users/authenticate", {
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
