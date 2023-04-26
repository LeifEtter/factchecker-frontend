export const isEmail = (email) => {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email !== "" && email.match(emailFormat) ? true : false;
};

export const isPassword = (password) => {
  var passwordFormat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return password !== "" && password.match(passwordFormat) ? true : false;
};
