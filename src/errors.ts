interface CustomErrorsType {
  UnknownError: number;
  InvalidInput: number;
  EmailNotExist: number;
  InvalidPassword: number;
  EmailWrongFormat: number;
  PasswordWrongFormat: number;
  NameMissing: number;
  EmailAlreadyExists: number;
  PasswordMissing: number;
}

export const CustomErrors: CustomErrorsType = {
  UnknownError: 0,
  InvalidInput: 1,
  EmailNotExist: 2,
  InvalidPassword: 3,
  EmailWrongFormat: 4,
  PasswordWrongFormat: 5,
  NameMissing: 6,
  EmailAlreadyExists: 7,
  PasswordMissing: 8,
};
